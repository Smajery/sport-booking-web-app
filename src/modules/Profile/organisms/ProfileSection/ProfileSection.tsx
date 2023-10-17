import apolloClient from "@/apollo-client";
import { GET_USER_QUERY } from "@/apollo/query/user";

const ProfileSection = async () => {
  const { data, loading, error } = await apolloClient.query({
    query: GET_USER_QUERY,
  });

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>Щось пішло не так...</div>;
  }
  const { fullname } = data.data;
  return <section>{fullname}</section>;
};

export default ProfileSection;
