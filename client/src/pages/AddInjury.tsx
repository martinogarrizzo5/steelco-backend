import InjuryForm from "../components/InjuryForm";
import PageTitle from "../components/PageTitle";
import { InjuryFormData } from "../components/InjuryForm";

function AddInjury() {
  const submitData = (data: InjuryFormData) => {
    console.log(data);
  };

  return (
    <main className="max-w-xl mx-auto mb-4 px-6">
      <PageTitle title="Aggiungi Infortunio" canGoBack />
      <InjuryForm onSubmit={submitData} />
    </main>
  );
}

export default AddInjury;
