import { Server, Server as ServerIO } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { Socket } from "net";
import { Server as NetServer } from "http";
import http from "http"
const httpServer = http.createServer();
export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
      server: NetServer & {
        io: ServerIO;
      };
    };
  };

const SocketHandler = (
    req: NextApiRequest,
    res: NextApiResponseServerIO
) => {
    if (res.socket.server.io) {
        console.log('이미 바인딩 되었습니다.');
      } else {
        
        console.log('서버-소켓 연결완료');
        const io : Server = new ServerIO(res.socket.server, );

        
        // console.log("console.log", res.socket.server)
        res.socket.server.io = io;
        io.on('connection', socket => {
          console.log("socket connection" , "Test")
        })
      }
      res.end();
};

export default SocketHandler;