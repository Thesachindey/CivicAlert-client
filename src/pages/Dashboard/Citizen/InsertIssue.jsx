import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const InsertIssue = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleInsertIssue = (data) => {
        if (!user) {
            return Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please login to submit an issue"
            });
        }

        const issueData = {
            title: data.title,
            description: data.description,
            category: data.category,
            priority: data.priority,
            image: data.image || "",
            location: data.location,
            createdBy: user.uid, // or user.email (keep consistent)
        };

        Swal.fire({
            title: "Confirm Issue Submission",
            html: `
                <div style="text-align:left">
                    <p><b>Title:</b> ${issueData.title}</p>
                    <p><b>Category:</b> ${issueData.category}</p>
                    <p><b>Priority:</b> ${issueData.priority}</p>
                    <p><b>Location:</b> ${issueData.location}</p>
                </div>
            `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Submit Issue",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/issues', issueData)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                icon: "success",
                                title: "Issue Submitted",
                                text: "Your issue has been reported successfully."
                            });
                            reset();
                            navigate('/all-issues');
                        }
                    });
            }
        });
    };

    return (
        <div className="bg-white p-10 rounded-3xl">
            <h1 className="text-4xl font-bold mb-2">Report an Issue</h1>
            <p className="text-gray-600 mb-6">
                Submit public infrastructure issues to help authorities take action.
            </p>

            <div className="border-t-2 border-dashed border-secondary/40 mb-8"></div>

            <form onSubmit={handleSubmit(handleInsertIssue)} className="space-y-6">

                {/* Title */}
                <fieldset className="fieldset">
                    <label className="label">Issue Title</label>
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="e.g. Broken street light near school"
                        {...register("title", { required: true })}
                    />
                </fieldset>

                {/* Description */}
                <fieldset className="fieldset">
                    <label className="label">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        rows={4}
                        placeholder="Describe the issue in detail"
                        {...register("description", { required: true })}
                    />
                </fieldset>

                {/* Category & Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <fieldset className="fieldset">
                        <label className="label">Category</label>
                        <select
                            defaultValue=""
                            className="select select-bordered w-full"
                            {...register("category", { required: true })}
                        >
                            <option value="" disabled>Select category</option>
                            <option>Road Damage</option>
                            <option>Water Leakage</option>
                            <option>Street Lighting</option>
                            <option>Waste Management</option>
                            <option>Public Safety</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Priority</label>
                        <select
                            defaultValue=""
                            className="select select-bordered w-full"
                            {...register("priority", { required: true })}
                        >
                            <option value="" disabled>Select priority</option>
                            <option>High</option>
                            <option>Normal</option>
                        </select>
                    </fieldset>
                </div>

                {/* Location */}
                <fieldset className="fieldset">
                    <label className="label">Location</label>
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="e.g. Mirpur-10, Dhaka"
                        {...register("location", { required: true })}
                    />
                </fieldset>

                {/* Image */}
                <fieldset className="fieldset">
                    <label className="label">Image URL (optional)</label>
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="https://example.com/image.jpg"
                        {...register("image")}
                    />
                </fieldset>

                <input
                    type="submit"
                    value="Submit Issue"
                    className="btn btn-primary text-white mt-6"
                />
            </form>
        </div>
    );
};

export default InsertIssue;
