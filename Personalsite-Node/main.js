var express = require('express')
var app = express();

var bodyParser = require('body-parser');
const md5 = require('md5');
const multer = require('multer')
const path = require('path');
var fs = require('fs');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const JWT_SECRET = "jkfjkhfjkj][][sdfsfkhdfjksaklfklsdfdaklfjkhdjkfllsdfjjh"
//const upload = multer({ dest: "uploads/" });

app.use(express.urlencoded());  // To parse URL-encoded bodies
app.use(express.json()); //To parse JSON bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
//app.use(upload.array())

var cors = require('cors');
app.use(cors())

var mongoose = require('mongoose');
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1/personalsite');

var { Details } = require('./schemas/detailsSchema');
const { Message } = require('./schemas/messagesSchema');
const { AdminLogin } = require('./schemas/adminLogin')
//const { AdminImage } = require('./schemas/adminImageSchema');
const { response } = require('express');

app.get('/', (req, res) => {
    Details.find((err, response) => {
        console.log(response);
        res.json(response);
    })
    //res.json([{"name" : "Hello World"}]);
})

// React POST request

const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, md5(Date.now() + Math.random()) + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })
//const upload = multer({ dest: "./uploads" });
app.post('/', upload.single('image'), (req, res) => {
    //console.log(req.body);

    console.log(req.file);
    console.log(req.file.filename);

    res.json({ file: req.file })
    console.log();

    const data = new Message({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        image: req.file.filename

    });
    //res.json(data)
    console.log(data);


    data.save((err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Success result");
            console.log(result)
        }
    })
})
var adminid;
app.get('/profile', (req, res) => {
    Details.find((err, response) => {
        adminid = response._id;
        console.log(response);
        res.json(response)
    })
})

app.post('/profile', (req, res) => {
    //var image = "arun"
    const newDetails = {
        fname: req.body.fname,
        lname: req.body.lname,
        role: req.body.role,
        skills: req.body.skills,
        hobbies: req.body.hobbies
    }
    console.log("New details: " + newDetails);

    Details.updateOne(adminid, newDetails, (err, response) => {
        console.log(response);
        res.json(response)
    })
})

app.get("/updateimage", (req, res) => {
    res.json({ "image": "arun.jpg" })
})

// const storage = multer.diskStorage({
//     destination:(req,files,cb)=>{
//         cb(null,'./uploads')
//     },
//     filename:(req, file,cb)=>{
//         cb(null,md5(Date.now() + Math.random()) + path.extname(file.originalname))
//     }
//   })

//const upload = multer({storage:storage})
//const upload = multer({ dest: "./uploads" });
app.post('/updateimage', upload.single('image'), async (req, res) => {
    //console.log(req.body);

    console.log(req.file);
    console.log(req.file.filename);

    //res.json({ file: req.file })




    const image = {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/jpg"
    }

    //res.json(data)

    await Details.findByIdAndUpdate({ _id: "639972752fec2dbed3f6b66b" }, { $set: { image: image } }, { new: true }, function (err, response) {
        if (err) {
            console.log("Error");
        } else {
            console.log("Updated");
        }
    }).clone()
})

app.get("/adminsignup", (req, res) => {
    res.json({ "Admin": "Arun" })
})

app.post('/adminsignup', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldAdmin = await AdminLogin.findOne({ email });
        if (oldAdmin) {
            return res.send({ error: "Admin Exists" })
        }


        var data = new AdminLogin({
            email: email,
            password: encryptedPassword,
        })
        await data.save((err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        })

    } catch (error) {
        res.send({ status: "Error" })
    }
})

app.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;

    const admin = await AdminLogin.findOne({ email });
    if (!admin) {
        return res.json({ error: "User not found" })
    }
    if (await bcrypt.compare(password, admin.password)) {
        const token = jwt.sign({ email: admin.email }, JWT_SECRET);
        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "Error" })
        }
    } else {
        res.json({ status: "error", error: "Invalid Password" })
    }
})

app.post('/admin', async (req, res) => {
    const { token } = req.body;
    try {
        const admin = jwt.verify(token, JWT_SECRET);
        const adminmail = admin.email;
        AdminLogin.findOne({ email: adminmail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            })
    } catch (error) {

    }
})


app.listen(8080);