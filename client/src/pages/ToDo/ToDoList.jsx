import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./ToDoList.module.css";
import {
  Button,
  Divider,
  Empty,
  Input,
  Modal,
  Select,
  Tag,
  Tooltip,
  message,
} from "antd";
import { getErrorMessage } from "../../util/GetError";
import { getUserDetails } from "../../util/GetUser";
import ToDoServices from "../../services/toDoServices";
import { useNavigate } from "react-router";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

function ToDoList() {
  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allToDo, setAllToDo] = useState([]);
  const [currentEditItem, setCurrentEditItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [currentTaskType, setCurrentTaskType] = useState("incomplete");
  const [completedTodo, setCompletedTodo] = useState([]);
  const [incompletedTodo, setIncompletedTodo] = useState([]);
  const [currentTodoTask, setCurrentToDoTask] = useState([]);
  const [filteredToDo, setFilteredToDo] = useState([]);
  const navigate = useNavigate(); // Navigation hook

  // Fetch all to-do tasks from the server
  const getAllToDo = async () => {
    try {
      let user = getUserDetails();
      console.log(user?.userId);
      const response = await ToDoServices.getAllToDo(user?.userId);
      console.log(response.data);
      setAllToDo(response.data);
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  };

  // Fetch tasks on component mount and user login status
  useEffect(() => {
    let user = getUserDetails();
    const getAllToDo = async () => {
      try {
        console.log(user?.userId);
        const response = await ToDoServices.getAllToDo(user?.userId);
        console.log(response.data);
        setAllToDo(response.data);
      } catch (err) {
        console.log(err);
        message.error(getErrorMessage(err));
      }
    };
    if (user && user?.userId) {
      getAllToDo();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Filter tasks into completed and incomplete categories
  useEffect(() => {
    const incomplete = allToDo.filter((item) => item.isCompleted === false);
    const complete = allToDo.filter((item) => item.isCompleted === true);
    setIncompletedTodo(incomplete);
    setCompletedTodo(complete);
    if (currentTaskType === "incomplete") {
      setCurrentToDoTask(incomplete);
    } else {
      setCurrentToDoTask(complete);
    }
  }, [allToDo]);

  // State variables for validation errors
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    updateTitle: "",
    updateDescription: "",
  });

  // Validation function for adding tasks
  const validateAddTask = () => {
    const newErrors = { title: "", description: "" };
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return isValid;
  };

  // Validation function for updating tasks
  const validateUpdateTask = () => {
    const newErrors = { updateTitle: "", updateDescription: "" };
    let isValid = true;

    if (!updatedTitle.trim()) {
      newErrors.updateTitle = "Update Title is required";
      isValid = false;
    }

    if (!updatedDescription.trim()) {
      newErrors.updateDescription = "Update Description is required";
      isValid = false;
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return isValid;
  };

  // Handle adding a new task
  const handleSubmitTask = async (e) => {
    e.preventDefault();
    if (!validateAddTask()) return;

    setLoading(true);
    try {
      const userId = getUserDetails()?.userId; // Replace with your actual user details function
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: userId,
      };
      const response = await ToDoServices.createToDo(data);
      console.log(response.data);
      message.success("To Do Task Added Successfully!");
      setTitle(""); // Clear the title field
      setDescription(""); // Clear the description field
      setLoading(false);
      setIsAdding(false);
      getAllToDo(); // Refresh the task list
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
      setLoading(false);
    }
  };

  // Format the date for display
  const getFormattedDate = (value) => {
    let date = new Date(value);
    let dateString = date.toDateString();
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = `${dateString} at ${hh}:${min}:${ss}`;
    return finalDate;
  };

  // Handle editing a task
  const handleEdit = (item) => {
    console.log(item);
    setCurrentEditItem(item);
    setUpdatedTitle(item?.title);
    setUpdatedDescription(item?.description);
    setUpdatedStatus(item?.isCompleted);
    setIsEditing(true);
  };

  // Handle deleting a task
  const handleDelete = async (item) => {
    try {
      const response = await ToDoServices.deleteToDo(item._id);
      console.log(response.data);
      message.success(`${item.title} is Deleted Successfully!`);
      getAllToDo();
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  };

  // Handle updating the status of a task
  const handleUpdateStatus = async (id, status) => {
    console.log(id);
    try {
      const response = await ToDoServices.updateToDo(id, {
        isCompleted: status,
      });
      console.log(response.data);
      message.success("Task Status Updated Successfully!");
      getAllToDo();
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  };

  // Handle update task submission
  const handleUpdateTask = async () => {
    if (!validateUpdateTask()) return;

    setLoading(true);
    try {
      const data = {
        title: updatedTitle,
        description: updatedDescription,
        isCompleted: updatedStatus,
      };
      console.log(data);
      const response = await ToDoServices.updateToDo(
        currentEditItem?._id,
        data
      );
      console.log(response.data);
      message.success(`${currentEditItem?.title} Updated Successfully!`);
      setUpdatedTitle(""); // Clear the updated title field
      setUpdatedDescription(""); // Clear the updated description field
      setLoading(false);
      setIsEditing(false);
      getAllToDo(); // Replace with your actual function to refresh the todo list
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err)); // Refresh the task list
      setLoading(false);
    }
  };

  // Handle task type filter change
  const handleTypeChange = (value) => {
    console.log(value);
    setCurrentTaskType(value);
    if (value === "incomplete") {
      setCurrentToDoTask(incompletedTodo);
    } else {
      setCurrentToDoTask(completedTodo);
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    let query = e.target.value;
    let filteredList = allToDo.filter((item) =>
      item.title.toLowerCase().match(query.toLowerCase())
    );
    console.log(filteredList);
    if (filteredList.length > 0 && query) {
      setFilteredToDo(filteredList);
    } else {
      setFilteredToDo([]);
    }
  };

  // State to store the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect hook to handle window resize
  useEffect(() => {
    // Function to update window width state
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine width based on window size
  const getWidth = () => {
    if (windowWidth <= 1024) return "100%";
    return "60%"; // Default width
  };

  // Determine marginTop based on window size
  const getMarginTop = () => {
    if (windowWidth <= 1024) return "10px";
    return "0px"; // Default marginTop
  };

  return (
    <>
      <Navbar active={"myTask"} />
      <section className={styles.toDoWrapper}>
        <div className={styles.toDoHeader}>
          <h2>Your Tasks</h2>
          <Input
            // style={{ width: "60%" }}
            style={{ width: getWidth() }}
            onChange={handleSearch}
            placeholder="Search Your Task Here..."
          />
          <div>
            <Button
              onClick={() => setIsAdding(true)}
              type="primary"
              size="large"
            >
              Add Task
            </Button>
            <Select
              value={currentTaskType}
              style={{
                width: 180,
                marginLeft: "10px",
                marginTop: getMarginTop(),
              }}
              onChange={handleTypeChange}
              size="large"
              options={[
                { value: "incomplete", label: "Incomplete" },
                { value: "complete", label: "Complete" },
              ]}
            />
          </div>
        </div>
        <Divider />

        <div className={styles.toDoListCardWrapper}>
          {filteredToDo.length > 0 ? (
            filteredToDo.map((item) => {
              return (
                <div key={item?._id} className={styles.toDoCard}>
                  <div>
                    <div className={styles.toDoCardHeader}>
                      <h3>{item?.title}</h3>
                      {item?.isCompleted ? (
                        <Tag color="cyan">Completed</Tag>
                      ) : (
                        <Tag color="red">Incomplete</Tag>
                      )}
                    </div>
                    <p>{item?.description}</p>
                  </div>

                  <div className={styles.toDoCardFooter}>
                    <Tag>{getFormattedDate(item?.createdAt)}</Tag>
                    <div className={styles.toDoFooterAction}>
                      <Tooltip title="Edit Task?">
                        <EditOutlined
                          onClick={() => handleEdit(item)}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                      <Tooltip title="Delete Task?">
                        <DeleteOutlined
                          onClick={() => handleDelete(item)}
                          style={{ color: "red" }}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                      {item?.isCompleted ? (
                        <Tooltip title="Mark as Incomplete">
                          <CheckCircleFilled
                            onClick={() => handleUpdateStatus(item._id, false)}
                            style={{ color: "green" }}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Mark as Completed">
                          <CheckCircleOutlined
                            onClick={() => handleUpdateStatus(item._id, true)}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : currentTodoTask.length > 0 ? (
            currentTodoTask.map((item) => {
              return (
                <div key={item?._id} className={styles.toDoCard}>
                  <div>
                    <div className={styles.toDoCardHeader}>
                      <h3>{item?.title}</h3>
                      {item?.isCompleted ? (
                        <Tag color="cyan">Completed</Tag>
                      ) : (
                        <Tag color="red">Incomplete</Tag>
                      )}
                    </div>
                    <p>{item?.description}</p>
                  </div>

                  <div className={styles.toDoCardFooter}>
                    <Tag>{getFormattedDate(item?.createdAt)}</Tag>
                    <div className={styles.toDoFooterAction}>
                      <Tooltip title="Edit Task?">
                        <EditOutlined
                          onClick={() => handleEdit(item)}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                      <Tooltip title="Delete Task?">
                        <DeleteOutlined
                          onClick={() => handleDelete(item)}
                          style={{ color: "red" }}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                      {item?.isCompleted ? (
                        <Tooltip title="Mark as Incomplete">
                          <CheckCircleFilled
                            onClick={() => handleUpdateStatus(item._id, false)}
                            style={{ color: "green" }}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Mark as Completed">
                          <CheckCircleOutlined
                            onClick={() => handleUpdateStatus(item._id, true)}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noTaskWrapper}>
              <Empty />
            </div>
          )}
        </div>

        <Modal
          confirmLoading={loading}
          title="Add New To Do Task"
          open={isAdding}
          onOk={handleSubmitTask}
          onCancel={() => setIsAdding(false)}
        >
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Title*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.description && (
            <p style={{ color: "red" }} className="error">
              {errors.description}
            </p>
          )}
          <Input.TextArea
            placeholder="Description*"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal>

        <Modal
          confirmLoading={loading}
          title={`Update ${currentEditItem.title}`}
          open={isEditing}
          onOk={handleUpdateTask}
          onCancel={() => setIsEditing(false)}
        >
          {errors.updateTitle && (
            <p style={{ color: "red" }}>{errors.updateTitle}</p>
          )}
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Updated Title*"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          {errors.updateDescription && (
            <p style={{ color: "red" }}>{errors.updateDescription}</p>
          )}
          <Input.TextArea
            style={{ marginBottom: "1rem" }}
            placeholder="Updated Description*"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <Select
            onChange={(value) => setUpdatedStatus(value)}
            value={updatedStatus}
            options={[
              {
                value: false,
                label: "Not Completed",
              },

              {
                value: true,
                label: "Completed",
              },
            ]}
          />
        </Modal>
      </section>
    </>
  );
}

export default ToDoList;
