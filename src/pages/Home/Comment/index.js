import Slider from "react-slick";
import ItemCard from "../../../components/ItemCard";
import images from "../../../asset/images";
import IconButton from "../../../components/IconButton";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../../components/Icon";

function Comment() {
  const slider = useRef();
  const { t } = useTranslation();
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    arrow: false,
  };

  const comments = [
    {
      name: "Lê Công Nghĩa",
      comment:
        "Bánh rất ngon và giá cả vô cùng hợp lý. Tôi đánh giá cao sự cẩn thận trong việc đóng gói và sự chu đáo của dịch vụ. Đặc biệt là hương vị của bánh rất phong phú và hấp dẫn, mang lại sự hài lòng cao.",
    },
    {
      name: "Nguyễn Văn A",
      comment:
        "Sản phẩm có chất lượng tuyệt vời, vượt qua mong đợi của tôi. Giao hàng nhanh chóng và đúng hẹn là một điểm cộng lớn. Tôi rất hài lòng với toàn bộ trải nghiệm mua sắm này và chắc chắn sẽ quay lại.",
    },
    {
      name: "Trần Thị B",
      comment:
        "Dịch vụ khách hàng thật sự xuất sắc. Tôi rất hài lòng với sản phẩm nhận được và sự hỗ trợ nhiệt tình từ đội ngũ chăm sóc khách hàng. Mọi thắc mắc của tôi đều được giải đáp nhanh chóng và hiệu quả.",
    },
    {
      name: "Hoàng Minh",
      comment:
        "Bánh trung thu rất thơm ngon và có mùi vị đặc biệt. Packaging của sản phẩm rất đẹp và sang trọng, làm cho tôi cảm thấy hài lòng ngay từ cái nhìn đầu tiên. Đây là một sản phẩm tuyệt vời để tặng bạn bè và gia đình.",
    },
    {
      name: "Phạm Hồng",
      comment:
        "Tôi thực sự ấn tượng với chất lượng của bánh. Mỗi lần ăn, tôi đều cảm nhận được sự tinh tế và tâm huyết của nhà sản xuất. Sẽ tiếp tục ủng hộ và giới thiệu cho bạn bè và người thân.",
    },
    {
      name: "Vũ Thị Mai",
      comment:
        "Sản phẩm đúng như mô tả, không có gì phải phàn nàn. Giao hàng nhanh chóng và đóng gói rất cẩn thận, đảm bảo sản phẩm đến tay người tiêu dùng trong tình trạng tốt nhất. Tôi rất hài lòng với dịch vụ này.",
    },
    {
      name: "Bùi Quang",
      comment:
        "Bánh ăn rất ngon và giá cả rất hợp lý. Dịch vụ cũng rất tốt và chuyên nghiệp, từ việc đặt hàng cho đến giao hàng. Đây là một lựa chọn tuyệt vời cho những ai yêu thích bánh trung thu chất lượng với giá phải chăng.",
    },
    {
      name: "Lê Thị Lan",
      comment:
        "Bánh có chất lượng rất tốt và hương vị rất đậm đà. Tôi cảm thấy hài lòng với sản phẩm này và sẽ tiếp tục mua trong tương lai. Sự chăm sóc khách hàng cũng rất chu đáo và nhiệt tình.",
    },
  ];

  return (
    <section
      className="xl:px-[150px] xl:py-[150px] sm:py-[150px] sm:px-[90px] py-[40px] px-[10px]"
      style={{
        backgroundImage: `url(${images.commentBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="relative">
          <IconButton
            className="absolute top-1/2 -translate-y-1/2 left-[-50px] sm:flex hidden"
            iconName="arrowSlider"
            variant="contained"
            size="small"
            bgColor="emerald"
            textColor="white"
            bgHoverColor="yellow"
            iconSize={1.5}
            onClick={() => {
              slider?.current?.slickPrev();
            }}
          />

          <IconButton
            className="rotate-180 absolute top-1/2 -translate-y-1/2 right-[-50px] sm:flex hidden"
            iconName="arrowSlider"
            variant="contained"
            size="small"
            bgColor="emerald"
            textColor="white"
            bgHoverColor="yellow"
            iconSize={1.5}
            onClick={() => {
              slider?.current?.slickNext();
            }}
          />

          <Slider ref={slider} {...settings}>
            {comments.map((item, index) => {
              return (
                <>
                  <div className="text-center xl:w-[70%] m-auto" key={index}>
                    <p className="text-[30px] font-light italic">
                      {item.comment}
                    </p>
                    <p className="text-2xl font-medium mt-5">{item.name}</p>
                  </div>
                </>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Comment;
