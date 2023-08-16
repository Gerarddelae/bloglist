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

test("default likes set to 0", async () => {
  const newBlog = {
    title: "how to sit",
    author: "urban",
    url: "htcs"
  }
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const finalBlogs = await Blog.find({})
  expect(finalBlogs[finalBlogs.length - 1].likes).toBeDefined()
})

test("url and title are required", async () => {
  const newBlog = {
    author: "bolt",
    likes: 4
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
})

test("deleting a Blog by id obtain 204", async () => {
  const startBlogs = await Blog.find({})
  const blogToDelete = startBlogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const endBlogs = await Blog.find({})
  const titles = endBlogs.map(n => n.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test("updating a blog by id return 200", async () => {
  const startBlogs = await Blog.find({})
  const blogToUpdate = startBlogs[0]
  const updatedBlog = {
    "title": "How to edit",
    "author": "ricky",
    "url": "httppp",
    "likes": 10,
    "id": blogToUpdate.id
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const endBlogs = await Blog.find({})
  expect(endBlogs[0].likes).toBe(updatedBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})