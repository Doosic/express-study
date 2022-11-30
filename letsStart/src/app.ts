import * as express from "express";
import { Cat, CatType } from "./app.models";

const app: express.Express = express();

// * logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is middleware");
  next();
});

//* json middleware
app.use(express.json());

//* READ 고양이 전체 데이터 조회
app.get("/cats", (req: express.Request, res: express.Response) => {
  try {
    const cats = Cat;
    // throw new Error("db connect error");
    res.send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* READ 특정 고양이 데이터 조회
app.get("/cats/:id", (req: express.Request, res: express.Response) => {
  try {
    const params = req.params;
    const cats = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* CREATE 새로운 고양이 추가 api
app.post("/cats", (req: express.Request, res: express.Response) => {
  try {
    const data = req.body;
    console.log(data);
    Cat.push(data); // create
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// * 404 middlewart
app.use((req, res, next) => {
  console.log("this is error middlewart");
  res.send({ error: "404 not found error" });
});

const port: number = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
