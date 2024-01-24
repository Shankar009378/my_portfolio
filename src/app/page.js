"use client"
import React, { useEffect, useState } from 'react';
import ClientHomeView from "@/components/client-view/home";
import ClientAboutView from "@/components/client-view/about";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientProjectView from "@/components/client-view/project";
import ClientContactView from "@/components/client-view/contact";

async function extractAllDatas(currentSection) {
  const res = await fetch(`https://my-portfolio-eta-seven-71.vercel.app/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  return data && data.data;
}

function Home() {
  const [homeSectionData, setHomeSectionData] = useState(null);
  const [aboutSectionData, setAboutSectionData] = useState(null);
  const [experienceSectionData, setExperienceSectionData] = useState(null);
  const [educationSectionData, setEducationSectionData] = useState(null);
  const [projectSectionData, setProjectSectionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setHomeSectionData(await extractAllDatas("home"));
      setAboutSectionData(await extractAllDatas("about"));
      setExperienceSectionData(await extractAllDatas("experience"));
      setEducationSectionData(await extractAllDatas("education"));
      setProjectSectionData(await extractAllDatas("project"));
    };

    fetchData();
  }, []);

  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView
        data={
          aboutSectionData && aboutSectionData.length ? aboutSectionData[0] : []
        }
      />
      <ClientExperienceAndEducationView
        educationData={educationSectionData}
        experienceData={experienceSectionData}
      />
      <ClientProjectView data={projectSectionData} />
      <ClientContactView />
    </div>
  );
}

export default Home;
