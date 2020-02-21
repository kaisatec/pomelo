#!/usr/bin/python2.7
#encoding=utf-8
#Based on 秋PN 秋天的树@989
#By icewater@989 

import socket
from threading import Thread
import sys
import signal
import struct
import random
import thread

SOCKTIMEOUT=5 #client side time out
RESENDTIMEOUT= 600 #forward time out

BUFSIZE=4096

VER="\x05"
METHOD="\x00"

SUCCESS="\x00"
SOCKFAIL="\x01"
NETWORKFAIL="\x02"
HOSTFAIL="\x04"
REFUSED="\x05"
TTLEXPIRED="\x06"
UNSUPPORTCMD="\x07"
ADDRTYPEUNSPPORT="\x08"
UNASSIGNED="\x09"

_LOGGER=None

_ipranges = None
_dnsCache = {}

def ip2long(ip):
    """
    Convert an IP string to long
    """
    packedIP = socket.inet_aton(ip)
    return struct.unpack("!L", packedIP)[0]

def validate_ip(address):
    try: 
        socket.inet_aton(address)
    except socket.error:
        # assume it's domain name
        ip = socket.gethostbyname(address) 
        return ip
    else: 
        return address

class Log:
    WARN="[WARN:]"
    INFO="[INFO:]"
    ERROR="[ERROR:]"
    def write(self,message,level):
        pass
        
class SimpleLog(Log):
    import sys
    def __init__(self,output=sys.stdout):
        self.__output=output
        self.show_log=True
        
    def write(self,message,level=Log.INFO):
        if self.show_log:
            self.__output.write("%s\t%s\n" %(level,message))
            
def getLogger(output=sys.stdout):
    global _LOGGER
    if not _LOGGER:
        _LOGGER=SimpleLog(output)
    return _LOGGER
        
class DataCryptor:
    'interface definition for obfuscator'
    def __init__(self, data, key):
        self.data = data
        self.key = key
    def result(self):
        assert (0), 'sub class must implement this method!'
    
class FlipCryptor (DataCryptor):
    'just flip every byte'
    def result(self):
        output = ''
        key = self.key
        if type(key)==type(''):
            key = ord(key[0])
        for x in list(self.data):
            output += chr(ord(x) ^ key )
        return output

class RemoteTransformer(Thread):
    def __init__(self, flag, src, encrypt_class):
        Thread.__init__(self)
        self.flag = flag
        self.src = src
        self.setDaemon(True)
        self.encrypt_class = encrypt_class
        self.dest = None
        
    def run(self):
        try:
            self.resend()
        except Exception, e:
            getLogger().write("Error on RemoteTransformer %s" %(e.message,),Log.ERROR)
            self.src.close()
            if self.dest is not None:
                self.dest.close()
        
    def resend(self):
        sock = self.src
        if self.flag=="\xfe":
            key, dlength = (sock.recv(1), sock.recv(1))
            # domain name
            domain = sock.recv(ord(dlength))
            domain =  self.encrypt_class(domain, key).result()
            # resolve domain
            ip = socket.gethostbyname(domain)
            ip_data = "".join([chr(int(i)) for i in ip.split(".")])
            ip_data = self.encrypt_class(ip_data, key).result()
            sock.sendall(ip_data)
            sock.close()
            return
        elif self.flag=="\xff":
            port_data, ip_data, key = (sock.recv(2), sock.recv(4), sock.recv(1))
            port_data = self.encrypt_class(port_data, key).result()
            ip_data = self.encrypt_class(ip_data, key).result()
            ip = ".".join([str(ord(i)) for i in ip_data])
            port = ord(port_data[0])*256+ord(port_data[1])
            getLogger().write("Destination IP: %s:%s" % (ip, port,), Log.INFO )
            remoteSock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
            try:
                if remoteSock.connect_ex((ip, port)) :
                    remoteSock.close()
                    sock.close()
                    getLogger().write("Failed to connect to %s:%s"%(ip,port,), Log.ERROR)
                    return
            except Exception, e:
                remoteSock.close()
                sock.close()
                getLogger().write("Error on connecting to %s:%s [%s]" %(ip,port,e.message,), Log.ERROR)
                return 
            sock.settimeout(RESENDTIMEOUT)
            remoteSock.settimeout(RESENDTIMEOUT)
            self.dest = remoteSock
            EncryptSender(sock, remoteSock, self.encrypt_class, key).start()
            EncryptSender(remoteSock, sock, self.encrypt_class,key).start()
            
        else:
            getLogger().write("Unknown protocol, exited")
            sock.close()
            

class LocalTransformer(Thread):
    def __init__(self,src,dest_ip,dest_port,bind=False, encrypt_class=None, encrypt_key=None, remote_proxy=None, requestdomain=None):
        Thread.__init__(self)
        self.dest_ip=dest_ip
        self.dest_port=dest_port
        self.src=src
        self.dest = None
        self.bind=bind
        self.setDaemon(True)
        self.encrypt_class = encrypt_class
        self.encrypt_key = encrypt_key
        self.remote_proxy = remote_proxy # tuple (address, port)
        self.request_domain = requestdomain

    def run(self):
        try:
            self.resend()
        except Exception,e:
            getLogger().write("Error on LocalTransformer %s" %(e.message,),Log.ERROR)
            self.sock.close()
            if self.dest is not None: 
                self.dest.close()
    @classmethod        
    def is_china_ip(self, ip, iplist=None):
        #return True
        if ip=='42.156.210.5':
            print 'test'
        global _ipranges
        if _ipranges is None:
            if iplist is None:
                return False
        if iplist is None:
            iplist = _ipranges
        keys = list(iplist.keys())
        ip_int = ip2long(ip)
        sip = min(keys, key=lambda x: abs(ip_int - x))
        if ip_int >= sip and ip_int <= iplist[sip]:
            return True
        else:
            try:
                index = iplist.keys().index(sip)
                if ip_int >= iplist.keys()[index] and ip_int <= iplist[index]:
                    return True
            except:
                pass
        return False

    def resend(self):
        self.sock=self.src
        #if need to resolve dns by remote proxy
        if self.request_domain is not None:
            newip = self.resolve_ip(self.remote_proxy, self.request_domain, self.encrypt_class,self.encrypt_key)
            if newip is not None:
                self.dest_ip = newip
                getLogger().write('Resolved IP for %s: %s' %(self.request_domain, newip,),Log.INFO)
            else:
                raise 'Failed to resolve domain name: ' + self.request_domain
                
        
        if self.is_china_ip(self.dest_ip): #if ip in china 
            dest_ip = self.dest_ip
            if self.request_domain is not None:
                dest_ip = socket.gethostbyname(self.request_domain)
                
            self.dest=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
            self.dest.connect((dest_ip,self.dest_port))
            if self.bind:
                getLogger().write("Waiting for the client")
                self.sock,info=self.sock.accept()
                getLogger().write("Client connected")
            getLogger().write("Starting Resending")
            self.sock.settimeout(RESENDTIMEOUT)
            self.dest.settimeout(RESENDTIMEOUT)
            self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_SNDBUF, 8*1024)
            self.dest.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 8*1024)
            DirectSender(self.sock,self.dest).start()
            DirectSender(self.dest,self.sock).start()
        else: # use remote proxy
            remoteSock = self.sendkey()
            self.dest = remoteSock
            if remoteSock is not None:
                self.sock.settimeout(RESENDTIMEOUT)
                self.dest.settimeout(RESENDTIMEOUT)
                self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_SNDBUF, 4*1024)
                self.dest.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 4*1024)
                EncryptSender(self.sock, remoteSock,self.encrypt_class, self.encrypt_key).start()
                EncryptSender(remoteSock, self.sock, self.encrypt_class,self.encrypt_key).start()
            else:
                pass # we should close self.sock here
                getLogger().write('Failed to send key to remote proxy.', Log.WARN)
            
    def sendkey(self):
        try:
            rsock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
            rsock.connect(self.remote_proxy)
            # protocol header
            rsock.sendall(b'\xff')
            # port and ip
            port_data = chr(self.dest_port/256)+chr(self.dest_port%256)
            port_data = self.encrypt_class(port_data, self.encrypt_key).result()
            ip_data = "".join([chr(int(i)) for i in self.dest_ip.split(".")])
            ip_data = self.encrypt_class(ip_data, self.encrypt_key).result()
            rsock.sendall(port_data)
            rsock.sendall(ip_data)
            #send the key
            rsock.sendall(self.encrypt_key)
            return rsock;
        except Exception, e:
            rsock.close()
            getLogger().write("Failed to send key %s" % (e.message,), Log.ERROR)
            return None
        
    @classmethod
    def resolve_ip(self, remote_proxy, domain, encrypt_class, encrypt_key):
        sock = None
        try:
            global _dnsCache
            if domain in _dnsCache:
                getLogger().write('DNS Cache found!', Log.INFO)
                return _dnsCache[domain]
            
            getLogger().write('Resolve DNS remotely for: %s' %(domain,),Log.INFO)
            sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
            sock.connect(remote_proxy)
            #header
            sock.sendall(b'\xfe')
            #key
            sock.sendall(encrypt_key)
            #length and domain 
            sock.sendall(chr(len(domain)))
            sock.sendall(encrypt_class(domain, encrypt_key).result())
            # get feed back
            newip = sock.recv(4)
            newip = encrypt_class(newip, encrypt_key).result()
            sock.close()        
            newip = ".".join([str(ord(i)) for i in newip])
            _dnsCache[domain] = newip
            return newip    
        except Exception, e:
            if sock is not None:
                sock.close()
            getLogger().write('Error getting ip from remote proxy, %s'%(e.message,), Log.WARN)
            pass

class EncryptSender(Thread):
    def __init__(self, src, dest, encrypt_class, encrypt_key):
        Thread.__init__(self)
        self.src = src
        self.dest = dest
        self.setDaemon(True)
        self.encrypt_class = encrypt_class
        self.encrypt_key = encrypt_key
    
    def run(self):
        try:
            self.resend(self.src,self.dest)
        except Exception,e:
            getLogger().write("Connection lost %s" %(e.message,),Log.ERROR)
            self.src.close()
            self.dest.close()

    def resend(self,src,dest):
        data=src.recv(BUFSIZE)
        while data:
            data = self.encrypt_class(data, self.encrypt_key).result()
            dest.sendall(data)
            data=src.recv(BUFSIZE)
        src.close()
        dest.close()
        getLogger().write("(E)Client quit normally\n")
        


class DirectSender(Thread):
    def __init__(self,src,dest):
        Thread.__init__(self)
        self.src=src
        self.setDaemon(True)
        self.dest=dest

    def run(self):
        try:
            self.resend(self.src,self.dest)
        except Exception,e:
            getLogger().write("Connection lost %s" %(e.message,),Log.ERROR)
            self.src.close()
            self.dest.close()

    def resend(self,src,dest):
        data=src.recv(BUFSIZE*2)
        while data:
            dest.sendall(data)
            data=src.recv(BUFSIZE*2)
        src.close()
        dest.close()
        getLogger().write("(D)Client quit normally\n")
       


def remote_connection_handler(sock, encrypt_class):
    try:
        sock.settimeout(SOCKTIMEOUT)
        header = sock.recv(1)
        if header=="\xfe" or header=="\xff":
            RemoteTransformer(header, sock, encrypt_class).start()
    except Exception, e:
        getLogger().write("Error on starting transform:"+e.message,Log.ERROR)
        sock.close()
    
def create_remote_server(ip,port, encrypt_class):
    transformer=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    transformer.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    transformer.bind((ip,port))
    signal.signal(signal.SIGTERM,OnExit(transformer).exit)
    transformer.listen(5)
    getLogger().write('Server start listening on %s:%s' % (ip,port,), Log.INFO)
    while True:
        sock,addr_info=transformer.accept()
        getLogger().write("Got one client connection")
        thread.start_new_thread(remote_connection_handler, (sock, encrypt_class))
    
def connection_handler(sock,ip, port, remote_proxy):
    sock.settimeout(SOCKTIMEOUT)
    try:
        ver,nmethods,methods=(sock.recv(1),sock.recv(1),sock.recv(1))
        sock.sendall(VER+METHOD)
        ver,cmd,rsv,atyp=(sock.recv(1),sock.recv(1),sock.recv(1),sock.recv(1))
        dst_addr=None
        dst_port=None
        domainname = None
        if atyp=="\x01":#IPV4
            dst_addr,dst_port=sock.recv(4),sock.recv(2)
            dst_addr=".".join([str(ord(i)) for i in dst_addr])
        elif atyp=="\x03":#Domain
            addr_len=ord(sock.recv(1))#length of domain
            dst_addr,dst_port=sock.recv(addr_len),sock.recv(2)
            domainname = dst_addr
            dst_addr="".join([unichr(ord(i)) for i in dst_addr])
        elif atyp=="\x04":#IPV6
            dst_addr,dst_port=sock.recv(16),sock.recv(2)
            tmp_addr=[]
            for i in xrange(len(dst_addr)/2):
                tmp_addr.append(unichr(ord(dst_addr[2*i])*256+ord(dst_addr[2*i+1])))
            dst_addr=":".join(tmp_addr)
        dst_port=ord(dst_port[0])*256+ord(dst_port[1])
        getLogger().write("Client wants to connect to %s:%d" %(dst_addr,dst_port))
        server_sock=sock
        server_ip="".join([chr(int(i)) for i in ip.split(".")])

        if cmd=="\x02":#BIND
            #Unimplement
            sock.close()
        elif cmd=="\x03":#UDP
            #Unimplement
            sock.close()
        elif cmd=="\x01":#CONNECT
            #if domainname is None:
            sock.sendall(VER+SUCCESS+"\x00"+"\x01"+server_ip+chr(port/256)+chr(port%256))
            #else: 
             #   sock.sendall(VER+SUCCESS+"\x00"+"\x01"+chr(len(domainname))+domainname+chr(port/256)+chr(port%256))
            getLogger().write("Starting transform thread")
            LocalTransformer(server_sock,dst_addr,dst_port,False, FlipCryptor, chr(random.randrange(0,255)), remote_proxy, domainname ).start()
        else:#Unspport Command
            sock.sendall(VER+ UNSUPPORTCMD +server_ip+chr(port/256)+chr(port%256))
            sock.close()
    except Exception,e:
        getLogger().write("Error on starting transform:"+e.message,Log.ERROR)
        sock.close()
    
def create_local_server(ip,port, remote_proxy, ipranges=None):
    global _ipranges
    _ipranges = ipranges
    transformer=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    transformer.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    transformer.bind((ip,port))
    signal.signal(signal.SIGTERM,OnExit(transformer).exit)
    transformer.listen(5)
    getLogger().write('Server start listening on %s:%s' % (ip,port,), Log.INFO)
    while True:
        sock,addr_info=transformer.accept()
        
        getLogger().write("Got one client connection")
        thread.start_new_thread(connection_handler, (sock,ip,port, remote_proxy))
        #connection_handler(sock,ip,port, remote_proxy)
        
    getLogger().write('Terminated!', Log.INFO)

class OnExit:
    def __init__(self,sock):
        self.sock=sock

    def exit(self):
        self.sock.close()

if __name__=='__main__':
    pass
#     try:
#         ip="0.0.0.0"
#         port=803
#         #create_local_server(ip,port)
#         create_remote_server(ip, port, FlipCryptor)
#     except Exception,e:
#         getLogger().write("Error on create server:"+e.message,Log.ERROR)
