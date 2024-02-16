import { GET_USER_QUERY } from "@/apollo/query/admin/user";
import { useQuery } from "@apollo/client";

const ProfileSection = () => {
  const { data, loading, error } = useQuery(GET_USER_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }
  const { fullname } = data.data;
  return <section>{fullname}</section>;
};

export default ProfileSection;
