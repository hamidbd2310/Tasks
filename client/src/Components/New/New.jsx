import React, { Fragment, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TaskListByStatus } from "../../ApiRequest/ApiRequest";
import { useSelector } from "react-redux";
import { DeleteToDO } from "../../Helper/DeleteAlert";
import { UpdateToDO } from "../../Helper/UpdateAlert";

const New = () => {
    const [search, setSearch] = useState("");

    useEffect(() => {
        TaskListByStatus("New");
    }, []);

    const NewList = useSelector((state) => state.task.New);

    const DeleteItem = (id) => {
        DeleteToDO(id).then((result) => {
            if (result === true) {
                TaskListByStatus("New");
            }
        });
    };

    const StatusChangeItem = (id, status) => {
        UpdateToDO(id, status).then((result) => {
            if (result === true) {
                TaskListByStatus("New");
            }
        });
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredList = NewList.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) || 
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Fragment>
            <Container fluid={true} className="content-body">
                <div className="row p-0 m-0">
                    <div className="col-12 col-md-6 col-lg-8 px-3">
                        <h5>Task New</h5>
                    </div>
                    <div className="col-12 float-end col-md-6 col-lg-4 px-2">
                        <div className="row">
                            <div className="col-8">
                                <input
                                    className="form-control w-100"
                                    value={search}
                                    onChange={handleSearchChange}
                                    placeholder="Search tasks"
                                />
                            </div>
                            <div className="col-4">
                                <button className="btn btn-primary w-100">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-0 m-0">
                    {filteredList.map((item, i) => (
                        <div key={i.toString()} className="col-12 col-lg-4 col-sm-6 col-md-4 p-2">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="animated fadeInUp">{item.title}</h6>
                                    <p className="animated fadeInUp">{item.description}</p>
                                    <p className="m-0 animated fadeInUp p-0">
                                        <AiOutlineCalendar /> {item.createdDate}
                                        <a onClick={() => StatusChangeItem(item._id, item.status)} className="icon-nav text-primary mx-1"><AiOutlineEdit /></a>
                                        <a onClick={() => DeleteItem(item._id)} className="icon-nav text-danger mx-1"><AiOutlineDelete /></a>
                                        <a className="badge float-end bg-info">{item.status}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Fragment>
    );
};

export default New;
