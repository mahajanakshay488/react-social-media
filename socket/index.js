const io = require('socket.io')(8900,{
    cors:{
        origin:"http://localhost:3001"
    }
});

let users =[];

const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId ===userId) &&
    users.push({userId, socketId});
}

const removeUser=(socketId)=>{
    users = users.filter(user => user.socketId !== socketId);
    // console.log(users);
}

const getUser=(userId)=>{
    let recievers = users.filter(user => user.userId === userId);
    if(recievers.length>0)
    return recievers[0];
}

io.on("connection", (socket)=>{
    console.log("User Connected !");
    io.emit('messege', 'Wellcome to socket server.');

    socket.on('addUser', userId=>{
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // Send Messege

    socket.on('sendMessege', ({userId, recieverId, text})=>{
        let reciever = getUser(recieverId);
        
        if(reciever){
            console.log('emit msg');
            io.to(reciever.socketId).emit('gettMessege',{
                author:userId,
                text
            });
        }
    });

    // remove User
    socket.on('disconnect', ()=>{
        console.log('user desconnected');
        removeUser(socket.id);
        io.emit("getUsers", users);
    });

    socket.on('userLogout', ()=>{
        console.log('user logout');
        removeUser(socket.id);
        io.emit("getUsers", users);
    });

});