import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { allServices } from "@/data/services-data";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import NotFound from "@/views/NotFound";

export default function DynamicServicePage({ slug }) {
  const router = useRouter();

  const currentSlug = slug || router.query.slug;
  const targetService = allServices.find((s) => s.slug === currentSlug);

  if (!targetService) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <title>{targetService.metaTitle || `${targetService.title} | Dharam Vir Infotech`}</title>
        <meta
          name="description"
          content={targetService.metaDescription || targetService.desc}
        />
        {targetService.primaryKeywords && (
          <meta
            name="keywords"
            content={`${targetService.primaryKeywords}, ${targetService.secondaryKeywords || ""}`}
          />
        )}
      </Head>
      <ServiceDetailTemplate service={targetService} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  return {
    props: {
      slug: slug || null,
    },
  };
}
