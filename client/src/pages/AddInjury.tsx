import InjuryForm from "../components/InjuryForm";
import PageTitle from "../components/PageTitle";
import { InjuryFormData } from "../components/InjuryForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackBar, SnackBarType } from "../store/snackBarStore";
import { showSnackbarOnAxiosError } from "../utils/error";

function AddInjury() {
  const navigate = useNavigate();
  const snackBar = useSnackBar();

  const submitData = async (data: InjuryFormData) => {
    try {
      const res = await axios.post("/api/injury", data)
      snackBar.show(res.data.message, SnackBarType.success);
      navigate(`/app/factory/${data.factory.id}/report`)
    } catch (err) {
      console.log(err);
      showSnackbarOnAxiosError(err, snackBar);
    }
  };

  return (
    <main className="max-w-xl mx-auto mb-4 px-6">
      <PageTitle title="Aggiungi Infortunio" canGoBack />
      <InjuryForm onSubmit={submitData} />
    </main>
  );
}

export default AddInjury;
