import OverviewContent from "../../components/organisms/overviewContent";
import SideBar from "../../components/organisms/sideBar";

export default function Member() {
  return (
    <section className="overview overflow-auto">
      <SideBar activeMenu="overview"/>
      <OverviewContent/>
    </section>
  );
}
