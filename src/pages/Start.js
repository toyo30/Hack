import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
    return (
        <div>
            <span>내일 언제 일어나실거에요??? ...</span>
            <Link to="/login">로그인 화면으로 이동하기</Link>
        </div>
    );
};

export default Start;
