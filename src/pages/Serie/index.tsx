import { useState, useEffect } from "react";
import { useParams } from "react-router";

import Container from "../../Components/Container"
import Breadcrumb from "../../Components/Breadcrumb";
import LoadingCard from "../../Components/LoadingCard"
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Menu } from "../../Components/Menu";
import LoadingGate from "../../Components/LoadingGate";
import SubTitle from "../../Components/SubTitle";
import Api from "../../Services/Api";
import { SeriesType } from "../../@types/SeriesType";
import { BannerSeries } from "../../Components/BannerSeries";
import { setTitle } from "../../utils/title";

export const Serie:React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [serie, setSerie] = useState<SeriesType | null>(null);

  const { id } = useParams();

  const getSerie = (): void => {

    setLoading(true);

    Api.get(`/series/${id}`)
      .then((response) => {
        setSerie(response?.data?.data?.results[0] ?? null);
      })
      .catch(() => {
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getSerie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle(`${serie?.title ?? "Loading..."} | Series`);
  }, [serie]);


    return (
      <>
        <Header />
        <Menu />
        <BannerSeries />
        <Container>
        <Breadcrumb 
          data={[
            {
                title: "Series",
                backTo: "/series",
            },
            {
                title: serie?.title ?? "Loading...",
                backTo: "",
            },
          ]}
        />
        <LoadingGate 
          waitFor={ isLoading === false}
          meanWile={ <LoadingCard /> }
        >
          <>
            <SubTitle mainTitle={serie?.title ?? "Loading..."}/>

                <div className="row mt-4 mb-4">
                    <img src={`${serie?.thumbnail?.path}.${serie?.thumbnail?.extension}`} alt={serie?.title} className="col-4 img-fluid border p-0 border-danger border-2"/>
                    <div className="col">
                        <p className="text-align-justify">{serie?.description ?? "Pending description"}</p>
                        <div className="d-flex flex-column">
                            <p className="mt-3"><span className="fw-bold">Modified:</span> {serie?.modified ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">Start Year:</span> {serie?.startYear ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">End Year:</span> {serie?.endYear ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">Rating:</span> {serie?.rating ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">Type:</span> {serie?.type ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">More information:</span> {serie?.urls?.url ?? "Undefined"}</p>
                        </div>
                    </div>
                </div>
          </>
        </LoadingGate>
        </Container>
        <Footer />
      </>
    );
  }