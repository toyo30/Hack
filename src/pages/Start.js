import React from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page";

const Start = () => {
    return (
        <Page>
            <div>
                재우미
                <Link to="/login">로그인 화면으로 이동하기</Link>
            </div>
        </Page>
    );
};

export default Start;
