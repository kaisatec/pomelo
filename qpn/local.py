#!/bin/python2.7

from xsocks import *

import ConfigParser
import getopt
import re
import struct
import collections

CONFIG_FILE="config.ini"

def show_help():
    print """\
Syntax: local %s <options>
 -a <addr>         listen address (default 0.0.0.0)
 -h                show this help screen
 -p <port>         listen port  (default 8080)
 -r <host:[port]>  redirect HTTP traffic to target host (default port: 1080)
""" % sys.argv[0]

def parse_options():
    try:
        opts, args = getopt.getopt(sys.argv[1:], "a:d:hp:r:vx:")
    except getopt.GetoptError, e:
        print str(e)
        show_help()
        exit(1)

    opts = dict([(k.lstrip('-'), v) for (k,v) in opts])

    if 'h' in opts:
        show_help()
        exit(0)

    config = {}

    if 'a' in opts:
        config['ip'] = opts['a']

    if 'p' in opts:
        config['port'] = int(opts['p'])
        
    # Check and parse redirection host
    if 'r' in opts:
        h = opts['r']
        if ':' not in h:
            p = 80
        else:
            h,p = h.split(':')
            p = int(p)
        config['remote'] = (h, p)
    return config



def load_iplist():
    iplist = None
    try:
        with open('iplist.txt','r') as fileObj:
            for line in fileObj:
                ips = re.findall(r'(?:[\d]{1,3})\.(?:[\d]{1,3})\.(?:[\d]{1,3})\.(?:[\d]{1,3})', line)
                if iplist is None:
                    iplist = {}
                if len(ips) == 2:
                    iplist[ ip2long(ips[0]) ] = ip2long(ips[1]) 
        return iplist
    except:
        getLogger().write('Failed to read ip list.', Log.INFO)

def main():
    config = {}
    #config = parse_options()
    # check ini configuration file
    try:
        parser = ConfigParser.RawConfigParser()
        parser.read(CONFIG_FILE)
        cfg = {}
        cfg['ip'] = parser.get('local', 'ip')
        cfg['port'] = parser.getint('local', 'port')
        cfg['remote'] = (validate_ip(parser.get('local', 'remote_ip')), parser.getint('local', 'remote_port'))
        config = cfg
    except Exception, e:
        getLogger().write("Can't read configuration file, %s" % (e.message,))
   # print config
    
    chinaips = None
    try: 
        ipranges = load_iplist()
        if ipranges is not None:
            ordered_iplist = collections.OrderedDict(sorted(ipranges.items()))
            #print ordered_iplist
            chinaips = ordered_iplist
    except:
        pass
    create_local_server(config['ip'], config['port'], config['remote'], chinaips)    
    

if __name__=='__main__':
    main()
