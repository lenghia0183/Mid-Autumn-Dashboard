import React from "react";
import { ReactComponent as ArrowDown } from "../../asset/icons/ArrowDown.svg";
import { ReactComponent as ArrowRight } from "../../asset/icons/ArrowRight.svg";
import { ReactComponent as Close } from "../../asset/icons/Close.svg";
import { ReactComponent as Phone } from "../../asset/icons/Phone.svg";
import { ReactComponent as VietnamFlag } from "../../asset/icons/VietnamFlag.svg";
import { ReactComponent as ChinaFlag } from "../../asset/icons/ChinaFlag.svg";
import { ReactComponent as JapanFlag } from "../../asset/icons/JapanFlag.svg";
import { ReactComponent as EnglandFlag } from "../../asset/icons/EnglandFlag.svg";
import { ReactComponent as Search } from "../../asset/icons/Search.svg";
import { ReactComponent as User } from "../../asset/icons/User.svg";
import { ReactComponent as Bag } from "../../asset/icons/Bag.svg";
import { ReactComponent as Location } from "../../asset/icons/Location.svg";
import { ReactComponent as Email } from "../../asset/icons/Email.svg";
import { ReactComponent as StarContained } from "../../asset/icons/Star-contained.svg";
import { ReactComponent as StarEmpty } from "../../asset/icons/Start-empty.svg";
import { ReactComponent as StarHalf } from "../../asset/icons/Star-half.svg";
import { ReactComponent as Eye } from "../../asset/icons/Eye.svg";
import { ReactComponent as Heart } from "../../asset/icons/Heart.svg";
import { ReactComponent as Category } from "../../asset/icons/Category.svg";
import { ReactComponent as Coin } from "../../asset/icons/Coin.svg";
import { ReactComponent as Vendor } from "../../asset/icons/Vendor.svg";
import { ReactComponent as Rating } from "../../asset/icons/Rating.svg";
import { ReactComponent as FirstPage } from "../../asset/icons/FirstPage.svg";
import { ReactComponent as LastPage } from "../../asset/icons/LastPage.svg";
import { ReactComponent as NextPage } from "../../asset/icons/NextPage.svg";
import { ReactComponent as PreviousPage } from "../../asset/icons/PrevPage.svg";
import { ReactComponent as Facebook } from "../../asset/icons/Facebook.svg";
import { ReactComponent as Google } from "../../asset/icons/Google.svg";
import { ReactComponent as showPassword } from "../../asset/icons/ShowPassword.svg";
import { ReactComponent as hidePassword } from "../../asset/icons/HidePassword.svg";
import { ReactComponent as Plus } from "../../asset/icons/Plus.svg";
import { ReactComponent as Minus } from "../../asset/icons/Minus.svg";
import { ReactComponent as Bin } from "../../asset/icons/Bin.svg";
import { ReactComponent as Edit } from "../../asset/icons/Edit.svg";
import { ReactComponent as Key } from "../../asset/icons/Key.svg";
import { ReactComponent as Order } from "../../asset/icons/Order.svg";
import { ReactComponent as Send } from "../../asset/icons/Send.svg";
import { ReactComponent as Refresh } from "../../asset/icons/Refresh.svg";
import { ReactComponent as Cart } from "../../asset/icons/Cart.svg";
import { ReactComponent as Copy } from "../../asset/icons/Copy.svg";
import { ReactComponent as LocationEmpty } from "../../asset/icons/LocationEmpty.svg";
import { ReactComponent as PaymentMethod } from "../../asset/icons/PaymentMethod.svg";
import { ReactComponent as Tag } from "../../asset/icons/Tag.svg";
import { ReactComponent as Menu } from "../../asset/icons/Menu.svg";
import { ReactComponent as Login } from "../../asset/icons/Login.svg";
import { ReactComponent as SignUp } from "../../asset/icons/SignUp.svg";
import { ReactComponent as Upload } from "../../asset/icons/Upload.svg";

import { ReactComponent as ArrowSlider } from "../../asset/icons/ArrowSlider.svg";
import useParseDimension from "../../hooks/useParseDimension";

import useColorClasses from "../../hooks/useColorClasses";
import clsx from "clsx";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";

export const icons = {
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  close: Close,
  phone: Phone,
  vietnamFlag: VietnamFlag,
  chinaFlag: ChinaFlag,
  japanFlag: JapanFlag,
  englandFlag: EnglandFlag,
  search: Search,
  user: User,
  bag: Bag,
  location: Location,
  email: Email,
  starContained: StarContained,
  starEmpty: StarEmpty,
  starHalf: StarHalf,
  eye: Eye,
  heart: Heart,
  arrowSlider: ArrowSlider,
  category: Category,
  coin: Coin,
  vendor: Vendor,
  rating: Rating,
  firstPage: FirstPage,
  lastPage: LastPage,
  nextPage: NextPage,
  previousPage: PreviousPage,
  facebook: Facebook,
  google: Google,
  showPassword: showPassword,
  hidePassword: hidePassword,
  plus: Plus,
  minus: Minus,
  bin: Bin,
  edit: Edit,
  key: Key,
  order: Order,
  send: Send,
  refresh: Refresh,
  cart: Cart,
  copy: Copy,
  locationEmpty: LocationEmpty,
  paymentMethod: PaymentMethod,
  tag: Tag,
  menu: Menu,
  login: Login,
  signUp: SignUp,
  upload: Upload,
};

const Icon = ({
  name = "",
  size = 2,
  width,
  height,
  className = "",
  color = "gray",
  strokeWidth,
  ...props
}) => {
  const IconComponent = icons[name];
  const { value, unit } = useParseDimension(`${size}`);
  const widthStyle = useResponsiveStyle(width, "w");
  const heightStyle = useResponsiveStyle(height, "h");

  const sizeStyle = {
    width: widthStyle?.width || `${value}${unit}`,
    height: heightStyle?.height || `${value}${unit}`,
  };

  const { textColor: newColor } = useColorClasses({ textColor: color });
  const style = {
    ...sizeStyle,
    color: newColor,
    strokeWidth: strokeWidth,
  };

  return (
    <span
      className={clsx(
        "x-icon inline-flex items-center justify-center transition duration-300",
        { "text-inherit": !newColor },
        newColor,
        className
      )}
      style={style}
      {...props}
    >
      {IconComponent && (
        <IconComponent className="w-full h-full" stroke="currentColor" />
      )}
    </span>
  );
};

export default Icon;
