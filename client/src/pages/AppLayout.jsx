import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Home from "../components/Home";
import EmptyBoard from "../components/EmptyBoard";
import { fetchBoards, setBoardActive } from "../redux/boardsSlice";

function AppLayout() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { boards, status, error } = useSelector((state) => state.boards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  useEffect(() => {
    if (boards.length > 0) {
      const activeBoard = boards.find((board) => board.isActive);
      if (!activeBoard) {
        dispatch(setBoardActive({ index: 0 }));
      }
    }
  }, [boards, dispatch]);

  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <>
        {status === "loading" && <div>Loading...</div>}
        {status === "failed" && <div>Error: {error}</div>}
        {status === "succeeded" && (
          <>
            {boards.length > 0 ? (
              <>
                <Header
                  setIsBoardModalOpen={setIsBoardModalOpen}
                  isBoardModalOpen={isBoardModalOpen}
                />
                <Home
                  setIsBoardModalOpen={setIsBoardModalOpen}
                  isBoardModalOpen={isBoardModalOpen}
                />
              </>
            ) : (
              <>
                <EmptyBoard type="add" />
              </>
            )}
          </>
        )}
      </>
    </div>
  );
}


export default AppLayout;
