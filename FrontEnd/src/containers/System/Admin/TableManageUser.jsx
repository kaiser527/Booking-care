import React, { useCallback, useEffect, useRef, useState } from "react";
import "./TableManageUser.scss";
import { useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { deleteUserService, getNullUsers } from "../../../services/userService";
import _ from "lodash";

const TableManageUser = (props) => {
  const currentLimit = 4;

  const { currentPage, setCurrentPage } = props;

  const [totalPages, setTotalPages] = useState(0);
  const [nullData, setNullData] = useState([]);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.admin.users);

  const nullUser = useRef({});

  useEffect(() => {
    dispatch(actions.fetchAllUserRedux(currentPage, currentLimit));
  }, [currentPage]);

  useEffect(() => {
    getUndefineUser();
    return () => {
      setNullData([]);
    };
  }, []);

  useEffect(() => {
    let deleteData = nullData?.find((item) => item.email === null);
    nullUser.current = deleteData;
    if (nullUser && nullUser.current && deleteData) {
      deleteNullUser(nullUser.current.id);
    }
    return () => {
      nullUser.current = {};
    };
  }, [nullData]);

  useEffect(() => {
    setTotalPages(data.totalPages);
  }, [data]);

  const getUndefineUser = async () => {
    let res = await getNullUsers();
    setNullData(res.users);
  };

  const deleteNullUser = async (id) => {
    await deleteUserService(id);
    await getUndefineUser();
  };

  const handleDeleteUser = (user) => {
    dispatch(actions.deleteUserRedux(user.id));
    setCurrentPage(1);
  };

  const handleEditUser = (user) => {
    props.handleEditUserFromParent(user);
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  return (
    <>
      <table id="TableManageUser">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="manage-user.email" />
            </th>
            <th>
              <FormattedMessage id="manage-user.full-name" />
            </th>
            <th>
              <FormattedMessage id="manage-user.address" />
            </th>
            <th>
              <FormattedMessage id="manage-user.phone-number" />
            </th>
            <th>
              <FormattedMessage id="manage-user.gender" />
            </th>
            <th>
              <FormattedMessage id="manage-user.role" />
            </th>
            <th>
              <FormattedMessage id="manage-user.position" />
            </th>
            <th>
              <FormattedMessage id="manage-user.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.users &&
            data.users.length > 0 &&
            data.users.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{user.email}</td>
                  <td>{user.fullName}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.gender}</td>
                  <td>{user.roleId}</td>
                  <td>{user.positionId}</td>
                  <td>
                    <span style={{ display: "flex" }}>
                      <button
                        className="btn-edit"
                        onClick={() => handleEditUser(user)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {totalPages > 0 && (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="mt-4 flex"
        >
          <ReactPaginate
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< Prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
          />
        </div>
      )}
    </>
  );
};

export default TableManageUser;
