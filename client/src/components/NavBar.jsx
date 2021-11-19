import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useDisclosure
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

export function WithSubnavigation() {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box>
			<Flex
				bg="brand.primary"
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				align={'center'}
				paddingLeft={20}
				paddingRight={20}
				paddingTop={5}
				paddingBottom={5}
			>
				<Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
					<IconButton
						onClick={onToggle}
						icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
					<Text textColor="white" fontFamily={'heading'}>
						Moseeqi
					</Text>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<Navbar />
					</Flex>
				</Flex>

				<Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
					<RouterLink to="/login">
						<Button textColor="white" fontWeight={400} variant={'link'} href={'/login'} paddingTop="5px">
							Login
						</Button>
					</RouterLink>
					<RouterLink to="/signup">
						<Button colorScheme="secondary" size="sm" textColor="white ">
							Sign Up
						</Button>
					</RouterLink>
				</Stack>
			</Flex>
		</Box>
	);
}

const Navbar = () => {
	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link
								p={2}
								color="white"
								fontSize={'sm'}
								fontWeight={500}
								_hover={{
									textDecoration: 'none',
									color: 'secondary.300'
								}}
							>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								color="white"
								bg="brand.secondary"
								p={4}
								rounded={'xl'}
								minW={'sm'}
							>
								<Stack>
									{navItem.children.map((child) => <SubNavBar key={child.label} {...child} />)}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const SubNavBar = ({ label, href, subLabel }) => {
	return (
		<Link href={href} role={'group'} display={'block'} p={2} rounded={'md'} _hover={{ bg: 'brand.accent1' }}>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text transition={'all .3s ease'} _groupHover={{ color: 'white' }} fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={'sm'} color="white">
						{subLabel}
					</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}
				>
					<Icon color="brand.secondary" w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const NAV_ITEMS = [
	{
		label: 'Explore',
		children: [
			{
				label: 'Music',
				subLabel: 'Trending Music to inspire you',
				href: '#'
			},
			{
				label: 'Artists',
				subLabel: 'Established Up-and-coming Artists',
				href: '#'
			}
		]
	},
	{
		label: 'About',
		children: [
			{
				label: 'Moseeqi',
				subLabel: 'Find the goal of this platform',
				href: '#'
			},
			{
				label: 'Who we are',
				subLabel: 'Get to know the team behind Moseeqi',
				href: '#'
			}
		]
	},
	{
		label: 'Create',
		href: '#'
	}
];
