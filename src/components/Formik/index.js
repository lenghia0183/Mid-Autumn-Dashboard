import FormikAutoComplete from "./FormikAutoComplete";
import FormikCheckBox from "./FormikCheckBox";
import FormikRadio from "./FormikRadio";
import FormikRadioGroup from "./FormikRadioGroup";
import FormikTextField from "./FormikTextField";

const Field = {
  Autocomplete: FormikAutoComplete,
  TextField: FormikTextField,
  CheckBox: FormikCheckBox,
  Radio: FormikRadio,
  RadioGroup: FormikRadioGroup,
};

export default Field;
