const Card = ({ title, subtitle, description, footer, icon, onClick }) => {
    return (
        <div
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
            onClick={onClick}
        >
            {icon && <div className="text-gray-700 mb-3">{icon}</div>}
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
            <p className="text-gray-700 mt-2">{description}</p>
            {footer && <div className="mt-3 text-blue-600">{footer}</div>}
        </div>
    );
};

export default Card;
