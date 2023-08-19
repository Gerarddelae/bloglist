const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const middleware = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get("/:id", async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(400).end()
  }
})

blogsRouter.post("/", middleware.userExtractor , async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)

})

blogsRouter.delete("/:id", middleware.userExtractor , async (request, response) => {
  const { id } = request.params

  const user = request.user
  const blog = await Blog.findById(id).populate("user", {id:1})

  if (!user) {
    response.status(400).json({error: "user does not exist"})
  }

  if (user._id.toString() !== blog.user.id.toString()) {
    return response.status(401).json({error: "not authorized to do that", user: user._id, blogUser: blog.user.id})
  }

  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: request.params.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)

})

module.exports = blogsRouter
