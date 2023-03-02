import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { host } from "./host";
import loader from "../assets/loader.gif";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = async () => {
    const res = await axios
      .get(`${host}/api/blog`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    setIsLoading(true);
    sendRequest()
      .then((data) => setBlogs(data.blogs))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Loading...</h2>
          <img src={loader} alt="loader" />
        </div>
      ) : (
        <div>
          {blogs &&
            blogs.map((blog, index) => (
              <Blog
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog.user._id}
                title={blog.title}
                description={blog.description}
                imageURL={blog.image}
                userName={blog.user.name}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
