import Swal from "sweetalert2";

const DeletePopup = Swal.mixin({
  icon: "warning",
  confirmButtonText: "Si, cancella",
  showCancelButton: true,
  cancelButtonColor: "var(--primaryColor)",
  cancelButtonText: "No, annulla",
  confirmButtonColor: "red",
  showLoaderOnConfirm: true,
});

export const DeleteFactoryPopup = DeletePopup.mixin({
  title: "Sei sicuro di cancellare lo stabilimento?",
  text: "Cancellare uno stabilimento cancella anche tutti gli infortuni relativi",
});

export const DeleteInjuryPopup = DeletePopup.mixin({
  title: "Sei sicuro di cancellare l'infortunio?",
  text: "Una volta cancellato non potrai più recuperarlo",
});

export default DeletePopup;
