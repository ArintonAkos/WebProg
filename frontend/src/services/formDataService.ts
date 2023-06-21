const FormDataService = {
  logFormData: (formData: FormData) => {
    for (let pair of formData.entries()) {
      if (pair[1] instanceof File) {
        console.log(pair[0] + ', ' + pair[1].name + ', ' + pair[1].size);
      } else {
        console.log(pair[0] + ', ' + pair[1]);
      }
    }
  },
};

export default FormDataService;
