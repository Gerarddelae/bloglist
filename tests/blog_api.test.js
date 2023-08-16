const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const initialBlogs = [
  {
    title: "how to dance",
    author: "MJ",
    url: "https",
    likes: 10
  },
  {
    title: "how to cook",
    author: "vives",
    url: "httpss",
    likes: 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("response have same length", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(initialBlogs.length)
})

test("blog have transformed id", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body[0].id).toBeDefined()
})

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "how to run",
    author: "bolt",
    url: "httss",
    likes: 4
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)
  
  const finalBlogs = await Blog.find({})
  expect(finalBlogs.length).toBe(initialBlogs.length + 1)
  const titles = finalBlogs.map(n => n.title)
  expect(titles).toContain("how to run")
})

afterAll(() => {
  mongoose.connection.close()
})