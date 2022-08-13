import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  message,
  List,
  Avatar,
  Popconfirm,
} from "antd";
import { DeleteOutlined, StopOutlined, UndoOutlined } from "@ant-design/icons";
import { Connect } from "../State/";
import debounce from "lodash/debounce";
import {
  fetchPlayers,
  createPlayer,
  searchPlayers,
  suspendUser,
  unSuspendUser,
  deletePlayer,
} from "../State/actions/players";
import {
  search,
  clearSearch,
  selectPlayer,
  clearSelectPlayer,
} from "../State/store";
import PlayerCreateForm from "./PlayerForm";
import PlayerFilter from "./PlayerFilter";
import { SuspendUserForm } from "../Users/SuspendUserForm";

import "./styles.css";
import { dispatch } from "../State/store";

const Player = ({ items, loading, selected }) => {
  const [showModal, setShowModal] = useState(false);
  const [suspendModal, setSuspendModal] = useState(false);
  const [showFilter, setshowFilter] = useState(false);

  const onCreate = async (values) => {
    dispatch(createPlayer(values))
      .then(() => {
        message.success("Player created");
        dispatch(fetchPlayers());
      })
      .catch(() => {
        message.error("Player creation failed");
      })
      .finally(() => {
        setShowModal(false);
      });
  };

  const onSearch = (values) => {
    console.log("Received values of form: ", values);
    setshowFilter(false);
  };

  const onChange = (e) => {
    if (e.target.value === "") {
      dispatch(fetchPlayers());
      dispatch(clearSearch());
      return;
    }
    searchWithDebouce(e.target.value, dispatch);
  };

  const onSuspend = async (value) => {
    const values = { id: selected, ...value };
    dispatch(suspendUser(values))
      .then(() => {
        message.success("User suspended successfully");
        dispatch(fetchPlayers());
      })
      .catch(() => {
        message.error("User suspension failed");
      })
      .finally(() => {
        setSuspendModal(false);
      });
  };

  const onUnSuspend = async (id) => {
    const values = { id };
    dispatch(unSuspendUser(values))
      .then(() => {
        message.success("User unsuspended successfully");
        dispatch(fetchPlayers());
      })
      .catch(() => {
        message.error("User unsuspension failed");
      })
      .finally(() => {});
  };

  const onDelete = async (id) => {
    const values = { id };
    dispatch(deletePlayer(values))
      .then(() => {
        message.success("User deleted successfully");
        dispatch(fetchPlayers());
      })
      .catch(() => {
        message.error("User deletion failed");
      })
      .finally(() => {});
  };

  const searchWithDebouce = debounce((query, dispatch) => {
    if (query !== "") {
      dispatch(search(query));
      dispatch(searchPlayers(query));
    }
  }, 200);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, []);

  return (
    <div className="player-base">
      <div style={{ height: "100px" }}></div>
      <SuspendUserForm
        visible={suspendModal}
        onCreate={onSuspend}
        onCancel={() => {
          setSuspendModal(false);
          dispatch(clearSelectPlayer());
        }}
      />
      <PlayerCreateForm
        visible={showModal}
        onCreate={onCreate}
        onCancel={() => {
          setShowModal(false);
        }}
      />
      <PlayerFilter
        visible={showFilter}
        onSearch={onSearch}
        onCancel={() => {
          setshowFilter(false);
        }}
      />
      <Row gutter={4}>
        <Col flex="auto">
          <Row>
            <Col span={14}>
              <Input
                placeholder="Search for player,academy,type,phone,account ID"
                onChange={onChange}
                allowClear
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <List
        style={{ margin: "30px 0" }}
        itemLayout="horizontal"
        pagination={{
          onChange: (page, pageSize) => {
            const data = { page, pageSize };
            dispatch(fetchPlayers(data));
          },
          defaultCurrent: items.page,
          total: items.total,
          pageSize: items.limit,
        }}
        bordered
        dataSource={items.data}
        loading={loading}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                placement="topRight"
                title={"Are you sure you want to delete?"}
                onConfirm={() => onDelete(item._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>,
              !item.suspend ? (
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch(selectPlayer(item._id));
                    setSuspendModal(true);
                  }}
                  icon={<StopOutlined />}
                >
                  Suspend
                </Button>
              ) : (
                <Button
                  type="ghost"
                  onClick={() => {
                    onUnSuspend(item._id);
                  }}
                  icon={<UndoOutlined />}
                >
                  Unsuspend
                </Button>
              ),
              // <Button type="ghost" icon={<UndoOutlined />}>
              //   Reset Password
              // </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.profileImage} size="large" />}
              title={
                <h2>{`${item.firstName} ${item.lastName} ${item.accountNumber}`}</h2>
              }
              description={`${item.phone} ${item.nationality}`}
            />
          </List.Item>
        )}
      />
      ,
    </div>
  );
};

// export default Player;
export default Connect(Player, {
  items: "player.items",
  loading: "player.loading",
  selected: "player.selected",
});
