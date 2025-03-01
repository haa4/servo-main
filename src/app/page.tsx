//src/app/page.tsx

// import { Projects } from "@/components/work/Projects";
import { baseURL, routes } from "@/app/resources";
import { company, home, about } from "@/app/resources/content";
import { Column } from "@/UI";
import { RevealFx } from "@/UI/RevealFx/RevealFx";
import { Heading } from "@/UI/Heading/Heading";
import { Button } from "@/UI/Button/Button";
import { Flex } from "@/UI/Flex/Flex";
import { Text } from "@/UI/Text/Text"
// import { Mailchimp } from "@/components";
// import { Posts } from "@/components/blog/Posts";


export async function generateMetadata() {
    const title = home.title;
    const description = home.description;
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://${baseURL}`,
            images: [
                {
                    url: ogImage,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export default function Home() {
    return (
        <Column maxWidth="m" gap="xl" horizontal="center">
            {/*<Column fillWidth paddingY="l" gap="m">*/}
            {/*    <Column maxWidth="s">*/}
            {/*        <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">*/}
            {/*            <Heading wrap="balance" variant="display-strong-l">*/}
            {/*                {home.headline}*/}
            {/*            </Heading>*/}
            {/*        </RevealFx>*/}
            {/*        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">*/}
            {/*            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">*/}
            {/*                {home.subline}*/}
            {/*            </Text>*/}
            {/*        </RevealFx>*/}
            {/*        <RevealFx translateY="12" delay={0.4} horizontal="start">*/}
            {/*            <Button*/}
            {/*                id="about"*/}
            {/*                data-border="rounded"*/}
            {/*                href="/about"*/}
            {/*                variant="secondary"*/}
            {/*                size="m"*/}
            {/*                arrowIcon*/}
            {/*            >*/}
            {/*            </Button>*/}
            {/*        </RevealFx>*/}
            {/*    </Column>*/}
            {/*</Column>*/}
            {/*{routes["/blog"] && (*/}
            {/*    <Flex fillWidth gap="24" mobileDirection="column">*/}
            {/*        <Flex flex={1} paddingLeft="l">*/}
            {/*            <Heading as="h2" variant="display-strong-xs" wrap="balance">*/}
            {/*                Latest from the blog*/}
            {/*            </Heading>*/}
            {/*        </Flex>*/}
            {/*        /!*<Flex flex={3} paddingX="20">*!/*/}
            {/*        /!*    <Posts range={[1, 2]} columns="2" />*!/*/}
            {/*        /!*</Flex>*!/*/}
            {/*    </Flex>*/}
            {/*)}*/}
            {/*<Projects range={[2]} />*/}
            {/*{newsletter.display && <Mailchimp newsletter={newsletter} />}*/}
        </Column>
    );
}