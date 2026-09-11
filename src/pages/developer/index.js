import DevelopersList from "@/views/DevelopersList";

export default function DeveloperListPage() {
  return <DevelopersList />;
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
