import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
      <Bars
        height="100"
        width="100"
        color="gray"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
