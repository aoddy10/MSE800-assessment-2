import React from "react";

function CityPage() {
    return (
        <div className="flex flex-col items-center">
            <div className="container flex flex-col gap-4">
                <image src="" className="h-[482px] bg-secondary" />
                <div className="flex gap-8 bg-red-200 p-8">
                    {/* description */}
                    <div className="bg-blue-200">
                        <h2 className="text-medium font-extrabold text-2xl">
                            Auckland, New Zealand
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Duis sed erat nisi. Nunc tellus sapien,
                            suscipit vel varius non, sagittis in nisl. Maecenas
                            sem metus, feugiat eu consectetur eget, varius
                            tempor elit. Aliquam cursus enim turpis, tempor
                            dapibus enim imperdiet ac. Suspendisse tincidunt
                            elementum erat eu vulputate. Phasellus ornare lectus
                            vel velit bibendum, sit amet dapibus nibh
                            ullamcorper. Maecenas tristique venenatis urna, non
                            porta nisi ultrices in. Etiam posuere pharetra
                            lacus, in hendrerit eros consectetur vel. Sed lorem
                            mi, imperdiet vel elit nec, eleifend condimentum
                            elit. Duis sollicitudin lobortis ultrices.
                        </p>
                    </div>
                    {/* review */}
                    <div className="flex flex-col bg-green-200">
                        <h2>Reviews</h2>
                        <div className="flex flex-col">
                            <div className="flex">
                                <image />
                                <div className="flex flex-col">
                                    <div>James Smith</div>
                                    <div>Tourist</div>
                                </div>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Duis sed erat nisi. Nunc tellus
                                sapien, suscipit vel varius non, sagittis in
                                nisl. Maecenas sem metus, feugiat eu consectetur
                                eget, varius tempor elit. Aliquam cursus enim
                                turpis.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CityPage;
