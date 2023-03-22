import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import FactoryForm, { FactoryFormData } from "../components/FactoryForm";
import { SnackBarType, useSnackBar } from "../store/snackBarStore";
import { showSnackbarOnAxiosError } from "../utils/error";
import PageTitle from "../components/PageTitle";

function AddInjury(){
    return (
        <h1>A</h1>
    )
}

export default AddInjury

