#!/bin/python2.7

from xsocks import *

import ConfigParser


CONFIG_FILE="config.ini"

def main():
    config = {}
    
    try:
        parser = ConfigParser.RawConfigParser()
        parser.read(CONFIG_FILE)
        cfg = {}
        cfg['ip'] = parser.get('remote', 'ip')
        cfg['port'] = parser.getint('remote', 'port')
        config = cfg
    except Exception, e:
        getLogger().write("Can't read configuration file, %s" % (e.message,))
   # print config
    create_remote_server(config['ip'], config['port'], FlipCryptor)

if __name__=='__main__':
    main()