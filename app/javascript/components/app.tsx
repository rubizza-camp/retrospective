import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate, Route,
  Routes
} from "react-router-dom";
import { userApi } from "../api/user-api";
import { RootState } from "../redux/store";
import { actions } from "../redux/user/slice";
import { Header } from "./common/header/header";
import ActionItemsContainer from "./pages/action-items/action-items-container";
import { BoardPage } from "./pages/board/board-page";
import BoardsContainer from "./pages/boards/boards-container";
import { SettingsPage } from "./pages/settings/settings-page";
import "./style.less";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.pending());
    try {
      userApi.getUser().then((user) => {
        dispatch(actions.setCurrentUser(user));
      });
    } catch {
      dispatch(actions.rejected());
    }
  }, []);

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/boards" element={<BoardsContainer />} />
          <Route path="/cards" element={<ActionItemsContainer />} />
          <Route path="/board/:boardSlug" element={<BoardPage />} />
          <Route
            path="/settings"
            element={currentUser && <SettingsPage user={currentUser} />}
          />
          <Route path="*" element={<Navigate to="/boards" />} />
        </Routes>
      </div>
    </div>
  );
};
