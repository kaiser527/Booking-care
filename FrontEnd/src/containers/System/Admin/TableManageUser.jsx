import React, { useEffect, useState } from "react";
import "./TableManageUser.scss";
import { useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

const TableManageUser = (props) => {
  const currentLimit = 4;

  const { currentPage, totalPages, setCurrentPage, setTotalPages } = props;

  const [userRedux, setUserRedux] = useState([]);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.admin.users);

  useEffect(() => {
    dispatch(actions.fetchAllUserRedux(currentPage, currentLimit));
  }, [currentPage]);

  useEffect(() => {
    const filteredData = data.users?.filter((user) => user.email !== null);
    const nullUser = data.users?.find((user) => user.email === null);
    if (nullUser) {
      dispatch(actions.deleteUserRedux(nullUser?.id));
    }
    setUserRedux(filteredData);
    setTotalPages(data.totalPages);
  }, [data.users]);

  const handleDeleteUser = (user) => {
    dispatch(actions.deleteUserRedux(user.id));
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
          {userRedux &&
            userRedux.length > 0 &&
            userRedux.map((user, index) => {
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
        <div className="user-footer mt-4">
          <ReactPaginate
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            nextLabel="next >"
            marginPagesDisplayed={4}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            pageCount={totalPages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            activeClassName="active"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            containerClassName="pagination"
          />
        </div>
      )}
    </>
  );
};

export default TableManageUser;
