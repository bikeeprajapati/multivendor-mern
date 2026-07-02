import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";
import Loader from "../Layout/Loader";

const AllEvents = () => {
    const { events, isLoading } = useSelector((state) => state.events);
    const { seller } = useSelector((state) => state.seller);

    const dispatch = useDispatch();

    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        dispatch(getAllEventsShop(seller._id));
    }, [dispatch, seller._id]);

    const confirmDelete = (id) => {
        setDeleteId(id);
    };

    const cancelDelete = () => {
        setDeleteId(null);
    };

    const handleDelete = async () => {
    await dispatch(deleteEvent(deleteId));
    setDeleteId(null);
    window.location.reload();
};

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: "Stock",
            headerName: "Stock",
            type: "number",
            minWidth: 80,
            flex: 0.5,
        },

        {
            field: "sold",
            headerName: "Sold out",
            type: "number",
            minWidth: 130,
            flex: 0.6,
        },
        {
            field: "Preview",
            flex: 0.8,
            minWidth: 100,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g, "-");
                return (
                    <>
                        <Link to={`/product/${product_name}`}>
                            <Button onMouseDown={(e) => e.stopPropagation()}>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
        {
            field: "Delete",
            flex: 0.8,
            minWidth: 120,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={() => confirmDelete(params.id)}
                        >
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];

    const row = [];

    events &&
        events.forEach((item) => {
            row.push({
                id: item._id,
                name: item.name,
                price: "US$ " + item.discountPrice,
                Stock: item.stock,
                sold: item.sold_out,
            });
        });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            )}

            <Dialog open={Boolean(deleteId)} onClose={cancelDelete}>
                <DialogTitle>
                    Are you sure you want to delete this event?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={cancelDelete}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AllEvents;