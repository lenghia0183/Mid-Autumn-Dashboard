export const TEXTFIELD_PREVENT = {
  NUMERIC: /^[0-9]*$/,
  POSITIVE_DECIMAL: /^[0-9.]*$/,
  ALPHA: /^[a-zA-Z]*$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]*$/,
};

export const TEXTFIELD_ALLOW = {
  NUMERIC: /[^0-9.]/g,
  REAL_NUMBER: /[^1-9.]/g,
  POSITIVE_DECIMAL: /[^0-9.]/g,
  ALPHANUMERIC: /[^a-zA-Z0-9]*/g,
  ALPHA: /[^a-zA-Z]/g,
  ALPHANUMERIC_SPECIAL: /[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/g,
  VIETNAMESE:
    /[^a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỹỳỵỷ\s]/g,
  VIETNAMESE_SPECIAL:
    /[^a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỹỳỵỷ\s!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]/g,
};

export const TEXTFIELD_REQUIRED_LENGTH = {
  COMMON: 255,
  MAX_50: 50,
  MAX_10: 10,
};
