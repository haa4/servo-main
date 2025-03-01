
import { company, social } from "@/app/resources/content";
import styles from "@/scss/Footer.module.scss";
import { Flex, Text, SmartLink, IconButton } from "@/UI";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Flex
            as="footer"
            position="relative"
            fillWidth
            padding="8"
            horizontal="center"
            mobileDirection="column"
        >
            <Flex
                className={styles.mobile}
                maxWidth="m"
                paddingY="8"
                paddingX="16"
                gap="16"
                horizontal="space-between"
                vertical="center"
            >
                <Text variant="body-default-s" onBackground="neutral-strong">
                    <Text onBackground="neutral-weak">© {currentYear} /</Text>
                    <Text paddingX="4">{company.name}</Text>
                    <Text onBackground="neutral-weak">
                        / Crafted in {" "}
                        <SmartLink
                            style={{ marginLeft: "-0.125rem" }}
                            href="https://servobharat.com"
                            gradientColors={["#FF671F", "#FFFFFF", "#046A38"]}
                            gradientRatios={[0.3, 0.5, 1]}
                        >
                            Bharat with ❤️
                        </SmartLink>
                    </Text>
                </Text>
                <Flex gap="16">
                    {social.map(
                        (item) =>
                            item.link && (
                                <IconButton
                                    key={item.name}
                                    href={item.link}
                                    icon={item.icon}
                                    tooltip={item.name}
                                    size="s"
                                    variant="ghost"
                                />
                            ),
                    )}
                </Flex>
            </Flex>
            <Flex height="80" show="s"></Flex>
        </Flex>
    );
};
