import arrowIcon from "@/assets/icons/arrow.png"
import workIcon from "@/assets/icons/work.png"
import auctionIcon from "@/assets/icons/auction_2.png"
import financeIcon from "@/assets/icons/finance_2.png"
import legalCocumentIcon from "@/assets/icons/legal-document.png"
import mailIcon from "@/assets/icons/mail.png"
import conversationIcon from "@/assets/icons/conversation.png"
import phishingIcon from "@/assets/icons/phishing.png"
import shieldIcon from "@/assets/icons/shield.png"
import cookieIcon from "@/assets/icons/cookie.png"
import privateIcon from "@/assets/icons/private.png"
import termsIcon from "@/assets/icons/terms.png"
import walletIcon from "@/assets/icons/wallet.png"
import verifyIcon from "@/assets/icons/verify.png"
import editIcon from "@/assets/icons/edit.png"
import navigationIcon from "@/assets/icons/navigation.png"
import carIcon from "@/assets/icons/car.png"
import accordIcon from "@/assets/icons/accord.png"

export const infoData = {
  main: {
    pageProps: {
      title: "Info Centre",
      subtitle: "Whether you’re looking to buy or sell vehicles, seeking company information, in need of assistance, or exploring legal matters, you’ve come to the right place.<br />Choose a section from the options below or initiate a search for any specific topic."
    },
    items: [
      {
        title: "Start to sell",
        subtitle:
          "Discover why OPENLANE is your go-to-partner to sell your vehicles hassle-free in the right markets, for the right price.",
        icon: financeIcon,
        link: '/'
      },
      {
        title: "Start to buy",
        subtitle:
          "Discover how OPENLANE makes it easy, fast and secure for you to buy vehicles across Europe. ",
        icon: auctionIcon,
        link: '/'
      },
      {
        title: "Company Information",
        subtitle:
          "Learn more about who we are.",
        icon: workIcon,
        link: '/'
      },
      {
        title: "Help",
        subtitle:
          "Find answers to your questions, through FAQ, chatbot or direct contact with our team.",
        icon: arrowIcon,
        link: 'help'
      },
      {
        title: "Legal matters",
        subtitle:
          "Explore our legal policies and privacy protection measures. Find out how to safeguard yourself against scams. ",
        icon: legalCocumentIcon,
        link: 'legal_matters'
      },
    ],
  },
  help: {
    pageProps: {
      title: "Help",
      subtitle: "Welcome to our help section! Whether you’re here to find answers or learn more about our products and services, this page is designed to provide the assistance you need.<br />Browse through our topics or use the search box for a seamless experience!"
    },
    items: [
      {
        title: "Contact",
        subtitle:
          "Get help with any questions, feedbackm, or inquiries you may have.",
        icon: mailIcon,
        link: '/'
      },
      {
        title: "FAQ",
        subtitle:
          "Find  answers to the most commonly asked questions about our products and services.",
        icon: conversationIcon,
        link: 'help/faq'
      },
    ]
  },
  faq: {
    pageProps: {
      title: "FAQ",
      subtitle: ""
    },
    items: [
      {
        title: "Registration",
        subtitle:
          "Get started easily with OPENLANE! Our registration process is designed to be quick and straightforward, so you can start exploring our marketplace without delay.",
        icon: editIcon,
        link: '/',
        tag: 'Buyers'
      },
      {
        title: "Login & Account",
        subtitle:
          "Discover everything you need to know about logging in and managing your account on OPENLANE in this section.",
        icon: verifyIcon,
        link: '/',
        tag: 'Buyers'
      },
      {
        title: "Auction process",
        subtitle:
          "Understand each step of participating in an auction on OPENLANE, from placing bids to what happens once the auction ends.",
        icon: auctionIcon,
        link: '/',
        tag: 'Buyers'
      },
      {
        title: "Negotiation",
        subtitle:
          "Discover how our negotiation capabilities can help you increase your auction success and make it easier to strike more deals!",
        icon: accordIcon,
        link: '/',
        tag: 'Buyers'
      },
      {
        title: "Car description",
        subtitle:
          "Find answers to your questions related to car descriptions, including damage information and pictures, maintenance details, and more.",
        icon: carIcon,
        link: '/',
        tag: 'Buyers'
      },
      {
        title: "Cost & Payments",
        subtitle:
          "Easily navigate costs and payments with the right information, including auction fees, payment terms, and more.",
        icon: walletIcon,
        link: '/',
        tag: 'Buyers'
      },
      {
        title: "Transport & Pick Up process",
        subtitle:
          "Need to arrange transport or pick up a vehicle? Get all the essential information you need to navigate the logistics smoothly.",
        icon: navigationIcon,
        link: '/',
        tag: 'Buyers'
      },
      {
        title: "Transport & Pick Up documents",
        subtitle:
          "Have the right documents ready for transport and pick-up, as they are crucial for a smooth experience.",
        icon: navigationIcon,
        link: '/',
        tag: 'Buyers'
      },
      {
        title: "Car documents and other related documents",
        subtitle:
          "Discover which documents are essential throughout the purchase process.",
        icon: carIcon,
        link: '/',
        tag: 'Buyers'
      },
      {
        title: "Auction process",
        subtitle:
          "Discover how our auction process is designed to be transparent, efficient, and user-friendly.",
        icon: auctionIcon,
        link: '/',
        tag: 'Sellers'
      },
      {
        title: "Negotiation feature",
        subtitle:
          "Make the most out of your transactions! Our negotiation feature allows you to engage directly with buyers after an auction, ensuring that you get the best possible deal. ",
        icon: accordIcon,
        link: '/',
        tag: 'Sellers'
      },
      {
        title: "Selling cars with OPENLANE",
        subtitle:
          "Discover how OPENLANE can simplify your selling experience and connect you with the right buyers. ",
        icon: financeIcon,
        link: '/',
        tag: 'Sellers'
      },
    ]
  },
  legal_matters: {
    pageProps: {
      title: "Legal matters",
      subtitle: "Find essential information on our terms and conditions, privacy policy, cookie policy, and more. Stay informed about your rights and how we help protect you from scam practices."
    },
    items: [
      {
        title: "Terms and Conditions for buyers",
        subtitle:
          "Learn about our terms and conditions for buyers to understand your rights and responsibilities.",
        icon: termsIcon,
        link: '/'
      },
      {
        title: "Terms and Conditions for sellers",
        subtitle:
          "Learn about our terms and conditions for sellers to understand your rights and responsibilities.",
        icon: termsIcon,
        link: '/'
      },
      {
        title: "Privacy notice",
        subtitle:
          "Discover our privacy notice to understand how we protect your information.",
        icon: privateIcon,
        link: '/'
      },
      {
        title: "Manage cookies",
        subtitle:
          "Manage your cookie preferences to enhance your browsing experience. Click below for more information.",
        icon: cookieIcon,
        link: '/'
      },
      {
        title: "Exercise your rights",
        subtitle:
          "Learn how to exercise your rights rearding  your personal data.",
        icon: shieldIcon,
        link: '/'
      },
      {
        title: "Scam precaution",
        subtitle:
          "Stay informed on how to protect yourself from scams.",
        icon: phishingIcon,
        link: '/'
      },
      {
        title: "Impressum",
        subtitle:
          "Find important company information and legal disclosures.",
        icon: workIcon,
        link: '/'
      },
    ]
  }
}