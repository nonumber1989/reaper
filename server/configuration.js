module.exports = {
    "socketIoPort":11111,
    "tokenSecret":"super.super.secret.shhh",
    "backend": {
	    "paths": ['login'], //paths to send to backend server
	    "host": '0.0.0.0',
	    "port": '8080',
	    "context": '' //context path of backend server
              	}
};
