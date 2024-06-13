import { useEffect } from "react";
import { fetchDataPost } from "../../utils/fetch";
import { useChat } from "../../context/chatContex";

const SearchUser = ({
  setUserFound,
  setIsSearch,
  userFound,
  setUserForChat,
  setLoading,
}) => {
  const { client } = useChat();
  useEffect(() => {
    if (userFound === "") {
      setIsSearch(false);
    }
  }, [userFound]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearch(true);

    let res = await fetchDataPost(`${client}/api/getUser`, {
      username: userFound,
    });

    if (res.status === 404) {
      setUserForChat("");
      setLoading(false);
    } else {
      setUserForChat(res.data);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="userFound"
            placeholder="Username"
            type="text"
            onChange={(value) => {
              setUserFound(value.target.value);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchUser;
