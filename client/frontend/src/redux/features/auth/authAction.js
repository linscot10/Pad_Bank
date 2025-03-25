import { createAsyncThunk } from "@reduxjs/toolkit"
import Api from "../../../services/Api"
import { toast } from 'react-toastify';

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {

            const { data } = await Api.post('auth/login', { role, email, password })
            // console.log(data);

            if (data.success) {
                // alert(data.message);
                localStorage.removeItem('token');
                // alert(data.message);
                localStorage.setItem("token", data.token);
                toast.success(data.message)
                window.location.replace("/");
            }

            return data;

        } catch (error) {

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const userRegister = createAsyncThunk(
    'auth/register',
    async ({
        name,
        email,
        password,
        role,
        organisationName,
        hospitalName,
        website,
        address,
        phone
    }, { rejectWithValue }) => {
        try {
            const { data } = await Api.post('auth/register', {
                name,
                email,
                password,
                role,
                organisationName,
                hospitalName,
                website,
                address,
                phone
            })
            if (data?.success) {
                alert("User Registered successfully!")
                toast.success("User Registered successfully!")
                window.location.replace('/login')
            }
            return data;

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            else {
                return rejectWithValue(error.message)
            }
        }
    }
)


export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async ({ rejectWithValue }) => {
        try {
            const res = await Api.get('/auth/current-user')
            // console.log(res)
            if (res.data) {
                return res?.data
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            else {
                return rejectWithValue(error.message)
            }
        }
    }
)