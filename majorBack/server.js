import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import multer from "multer";
import archiver from "archiver";
import path from 'path'


const app= express()

app.use (cors({
    // origin: 'http://localhost:5173',
    origin: '*',
    credentials:true
})) 

app.use(bodyParser.json());
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"))
app.use(cookieParser())


const storage = multer.memoryStorage();
export const upload = multer({storage })


app.post("/api/upload",upload.single('image'),(req,res)=>{
  // console.log(req.file)

  res.set('Content-Type', 'image/png');
  return res.send(req.file.buffer)
})

app.get("/api/obj",(req,res)=>{
  res.set('Content-Type','application/zip')


  const archive= archiver("zip",{zlib:{level:9}})

  archive.on('error',(e)=>{
    res.status(500)
    .send({error: e.message})
  })

  archive.pipe(res)

  const objPath = path.join( 'cottage', 'cottage_obj.obj');
  const mtlPath = path.join('cottage','cottage_obj.mtl')
  const normalPath = path.join('cottage','cottage_diffuse.png')
  const diffusePath= path.join('cottage','cottage_normal.png')

  archive.file(objPath, { name: 'model.obj' });
  archive.file(mtlPath,{name:'model.mtl'})
  archive.file(normalPath,{name:'cottage_diffuse.png'})
  archive.file(diffusePath,{name:'cottage_normal.png'})

  console.log(objPath)

  archive.finalize();
  // const mtlPath = path.join(__dirname, 'models', 'model.mtl');


  // res.status(200)
  // .json({hi:'hello'})
})

app.get("/api/ply",(req,res)=>{
  res.set("Content-Type","application/zip")

  const archive = archiver("zip",{zlib:{level:9}})

  archive.on("error",(e)=>{
    console.log("An error has occured in ply file")
  })
  archive.pipe(res)

  // const plyPath= path.join("axle shaft","Axle shaft.ply");
  const plyPath= path.join("samples","open (2).ply");

  archive.file(plyPath,{name:'model.ply'})

  console.log("this is done")
  archive.finalize();
})


app.listen(4004, () => {
  console.log("Server running");
});

// "192.168.18.19"