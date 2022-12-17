import Link from "next/link";

const AuthHeader = ({ heading, paragraph, linkName, linkUrl = "#" }) => {
    return(
        <div className="mb-10">
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-wide">
                {heading}
            </h2>
            <p className="text-center text-sm text-gray-600 mt-5">
                {paragraph} {' '}
            <Link href={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}
 
export default AuthHeader;