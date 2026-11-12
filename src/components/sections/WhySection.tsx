import { why } from "@/content/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Blob } from "@/components/shared/Decor";
import { DesktopWhy } from "@/components/desktop/DesktopWhy";
import { MobileWhy } from "@/components/mobile/MobileWhy";

export function WhySection() {
  return (
    <section id="why" data-anchor aria-labelledby="why-title" className="relative overflow-hidden bg-soft py-20 sm:py-24 lg:py-32">
      <Blob color="electric" className="-left-60 top-1/4 size-[560px] opacity-50" />
      <div className="container-x relative">
        <SectionHeading
          id="why-title"
          eyebrow="Преимущества формата"
          title={
            <>
              Почему выбирают <span className="text-gradient">БИОГЛАЗ</span>
            </>
          }
          subtitle={why.subtitle}
          align="center"
          className="mx-auto"
        />
        <div className="mt-12 hidden lg:block">
          <DesktopWhy />
        </div>
        <div className="mt-10 lg:hidden">
          <MobileWhy />
        </div>
      </div>
    </section>
  );
}
