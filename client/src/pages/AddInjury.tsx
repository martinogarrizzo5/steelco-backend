import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import FactoryForm, { FactoryFormData } from "../components/FactoryForm";
import { SnackBarType, useSnackBar } from "../store/snackBarStore";
import { showSnackbarOnAxiosError } from "../utils/error";
import PageTitle from "../components/PageTitle";

function AddInjury(){
    return (
        <main className="max-w-xl mx-auto mb-4 px-6">
          <PageTitle title="Aggiungi Infortunio" canGoBack />
        </main>
      );
}

export default AddInjury

