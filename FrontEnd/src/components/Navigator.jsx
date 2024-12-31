import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import "./Navigator.scss";

const MenuGroup = (props) => {
  const { name, children } = props;
  return (
    <li className="menu-group">
      <div className="menu-group-name">
        <FormattedMessage id={name} />
      </div>
      <ul className="menu-list list-unstyled">{children}</ul>
    </li>
  );
};

const Menu = (props) => {
  const { name, active, link, children, onClick, hasSubMenu, onLinkClick } =
    props;
  return (
    <li
      className={
        "menu" +
        (hasSubMenu ? " has-sub-menu" : "") +
        "" +
        (active ? " active" : "")
      }
    >
      {hasSubMenu ? (
        <Fragment>
          <span
            data-toggle="collapse"
            className={"menu-link collapsed"}
            onClick={onClick}
            aria-expanded={"false"}
          >
            <FormattedMessage id={name} />
            <div className="icon-right">
              <i className={"far fa-angle-right"} />
            </div>
          </span>
          <div>
            <ul className="sub-menu-list list-unstyled">{children}</ul>
          </div>
        </Fragment>
      ) : (
        <Link to={link} className="menu-link" onClick={onLinkClick}>
          <FormattedMessage id={name} />
        </Link>
      )}
    </li>
  );
};

const SubMenu = (props) => {
  const { name, link, onLinkClick } = props;

  const getItemClass = (path) => {
    return this.props.location.pathname === path ? "active" : "";
  };

  return (
    <li className={"sub-menu " + getItemClass(link)}>
      <Link to={link} className="sub-menu-link" onClick={onLinkClick}>
        <FormattedMessage id={name} />
      </Link>
    </li>
  );
};

const MenuGroupWithRouter = withRouter(MenuGroup);
const MenuWithRouter = withRouter(Menu);
const SubMenuWithRouter = withRouter(SubMenu);

const withRouterInnerRef = (WrappedComponent) => {
  const InnerComponentWithRef = (props) => {
    const { forwardRef, ...rest } = props;
    return <WrappedComponent {...rest} ref={forwardRef} />;
  };

  const ComponentWithRef = withRouter(InnerComponentWithRef, { withRef: true });

  return React.forwardRef((props, ref) => {
    return <ComponentWithRef {...props} forwardRef={ref} />;
  });
};

const Navigator = (props) => {
  const { menus, location, onLinkClick } = props;

  const [expandedMenuState, setExpandedMenuState] = useState({});

  useEffect(() => {
    checkActiveMenu();
  }, [location]);

  const toggle = (groupIndex, menuIndex) => {
    const expandedMenu = {};
    const needExpand = !(
      expandedMenuState[groupIndex + "_" + menuIndex] === true
    );
    if (needExpand) {
      expandedMenu[groupIndex + "_" + menuIndex] = true;
    }
    setExpandedMenuState(expandedMenu);
  };

  const isMenuHasSubMenuActive = (location, subMenus, link) => {
    if (subMenus) {
      if (subMenus.length === 0) {
        return false;
      }

      const currentPath = location.pathname;
      for (let i = 0; i < subMenus.length; i++) {
        const subMenu = subMenus[i];
        if (subMenu.link === currentPath) {
          return true;
        }
      }
    }

    if (link) {
      return props.location.pathname === link;
    }

    return false;
  };

  const checkActiveMenu = () => {
    const { menus, location } = props;
    outerLoop: for (let i = 0; i < menus.length; i++) {
      const group = menus[i];
      if (group.menus && group.menus.length > 0) {
        for (let j = 0; j < group.menus.length; j++) {
          const menu = group.menus[j];
          if (menu.subMenus && menu.subMenus.length > 0) {
            if (isMenuHasSubMenuActive(location, menu.subMenus, null)) {
              const key = i + "_" + j;
              setExpandedMenuState({
                [key]: true,
              });
              break outerLoop;
            }
          }
        }
      }
    }
  };

  return (
    <Fragment>
      <ul className="navigator-menu list-unstyled">
        {menus.map((group, groupIndex) => {
          return (
            <Fragment key={groupIndex}>
              <MenuGroupWithRouter name={group.name}>
                {group.menus
                  ? group.menus.map((menu, menuIndex) => {
                      const isSubMenuOpen =
                        expandedMenuState[groupIndex + "_" + menuIndex] ===
                        true;
                      return (
                        <MenuWithRouter
                          key={menuIndex}
                          active={isMenuHasSubMenuActive(
                            location,
                            menu.subMenus,
                            menu.link
                          )}
                          name={menu.name}
                          link={menu.link}
                          hasSubMenu={menu.subMenus}
                          isOpen={isSubMenuOpen}
                          onClick={() => toggle(groupIndex, menuIndex)}
                          onLinkClick={onLinkClick}
                        >
                          {menu.subMenus &&
                            menu.subMenus.map((subMenu, subMenuIndex) => (
                              <SubMenuWithRouter
                                key={subMenuIndex}
                                name={subMenu.name}
                                link={subMenu.link}
                                onLinkClick={onLinkClick}
                              />
                            ))}
                        </MenuWithRouter>
                      );
                    })
                  : null}
              </MenuGroupWithRouter>
            </Fragment>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default withRouterInnerRef(Navigator);
