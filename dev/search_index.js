var documenterSearchIndex = {"docs":
[{"location":"#InverseLaplace","page":"Home","title":"InverseLaplace","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Numerical inverse Laplace transform","category":"page"},{"location":"","page":"Home","title":"Home","text":"The source repository is https://github.com/JuliaMath/InverseLaplace.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package provides three algorithms for numerically inverting Laplace transforms.","category":"page"},{"location":"#Contents","page":"Home","title":"Contents","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Inverse-Laplace-transform-algorithms","page":"Home","title":"Inverse Laplace transform algorithms","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Constructing these Julia types, corresponding to different numerical algorithms, returns a callable object that evaluates the inverse Laplace transform at specified points.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Talbot\nILT\nGWR\nWeeks\nWeeksErr\ngaverstehfest","category":"page"},{"location":"#InverseLaplace.Talbot","page":"Home","title":"InverseLaplace.Talbot","text":"ft::Talbot = Talbot(func::Function, Nterms::Integer=32)\n\nReturn ft, which estimates the inverse Laplace transform of func with the fixed Talbot algorithm. ft(t) evaluates the transform at t.  You may want to tune Nterms together with setprecision(BigFloat, x).\n\nExample\n\nCompute the inverse transform of the transform of cos at argument pi/2.\n\njulia> ft = Talbot(s -> s / (s^2 + 1), 80);\n\njulia> ft(pi / 2)\n-3.5366510684573195e-5\n\nNote that given Float64 input, the precision of the returned value may not be satisfactory.\n\njulia> Float64(ft(big(pi) / 2))\n2.114425886215604e-49\n\nnote: Note\nThis function uses the fixed Talbot method. It evaluates the Laplace transform function for complex arguments. The GWR method is, in general, less accurate and less stable, but does not evaluate the Laplace transform function for complex arguments.\n\n\n\n\n\n","category":"type"},{"location":"#InverseLaplace.ILT","page":"Home","title":"InverseLaplace.ILT","text":"ILT(function, Nterms=32)\n\nThis is an alias for the default Talbot() method.\n\n\n\n\n\n","category":"function"},{"location":"#InverseLaplace.GWR","page":"Home","title":"InverseLaplace.GWR","text":"ft::GWR = GWR(func::Function, Nterms::Integer=16)\n\nReturn ft, which estimates the inverse Laplace transform of func with the GWR algorithm. ft(t) evaluates the transform at t.\n\nExample\n\nCompute the inverse transform of the transform of cos at argument pi / 2.\n\njulia> ft = GWR(s -> s / (s^2 + 1), 16);\n\njulia> ft(pi / 2)\n-0.001\n\n\n\n\n\n","category":"type"},{"location":"#InverseLaplace.Weeks","page":"Home","title":"InverseLaplace.Weeks","text":"w::Weeks{datatype} = Weeks(func::Function, Nterms::Integer=64, sigma=1.0, b=1.0; datatype=Float64)\n\nReturn w, which estimates the inverse Laplace transform of func with the Weeks algorithm. w(t) evaluates the transform at t. The accuracy depends on the choice of sigma and b, with the optimal choices depending on t. datatype should agree with the DataType returned by func. For convenience, datatype=Complex is equivalent to datatype=Complex{Float64}\n\nThe call to Weeks that creates w is expensive relative to evaluation via w(t).\n\nExample\n\nCompute the inverse transform of the transform of cos at argument pi/2.\n\njulia> ft = Weeks(s -> s/(s^2+1), 80);\n\njulia> ft(pi/2)\n0.0\n\n\n\n\n\n","category":"type"},{"location":"#InverseLaplace.WeeksErr","page":"Home","title":"InverseLaplace.WeeksErr","text":"w::WeeksErr{datatype} = WeeksErr(func::Function, Nterms::Integer=64, sigma=1.0, b=1.0; datatype=Float64)\n\nReturn w, which estimates the inverse Laplace transform of func via the Weeks algorithm. w(t) returns a tuple containing the inverse transform at t and an error estimate. The accuracy of the inversion depends on the choice of sigma and b. See the documentation for Weeks for a description of the parameter datatype.\n\nExample\n\nCompute the inverse transform of the transform of cos, and an error estimate, at argument pi/2 using 80 terms.\n\njulia> ft = WeeksErr(s -> s/(s^2+1), 80);\n\njulia> ft(pi/2)\n(0.0,3.0872097665938698e-15)\n\nThis estimate is more accurate than cos(pi/2).\n\njulia> ft(pi/2)[1] - cos(pi/2)\n-6.123233995736766e-17\n\njulia> ft(pi/2)[1] - 0.0         # exact value\n0.0\n\njulia> ft(pi/2)[1] - cospi(1/2)  # cospi is more accurate\n0.0\n\n\n\n\n\n","category":"type"},{"location":"#InverseLaplace.gaverstehfest","page":"Home","title":"InverseLaplace.gaverstehfest","text":"gaverstehfest(func::Function, t::AbstractFloat, v = stehfest_coeffs(N))\n\nEvaluate the inverse Laplace transform of func at the point t using the Gaver-Stehfest algorithm. v are the stehfest coefficients computed with stehfest_coeffs that only depend on number of terms.  N (which must be even) defaults to 36 should depend on the precision used and desired accuracy. The precision of the stehfest coefficients is used in the computation. \n\nIn double precision (Float64), N should be <= 18 to provide best accuracy. Usually only moderate accuracy can be achieved in double precision ~rtol ≈ 1e-4. For higher accuracy, BigFloats should be used with N = 36.\n\nIncreasing precision should be accompanied by an increase in the number of coefficients used. Increasing precision without increasing number of coefficients will not yield better accuracy. The inverse is generally true as well.\n\nThis method is not robust to oscillating F(t) and must be smooth.\n\nExamples\n\njulia> F(s) = 1 / (s + 1) # where analytical inverse is f(t) = exp(-t)\n\njulia> InverseLaplace.gaverstehfest(F, 2.0) # computes with default 36 coefficients\n0.1353352832366128315426471959891170863784520272858265151734040491181311503059561\n\njulia> InverseLaplace.gaverstehfest(F, 2.0, v = stehfest_coeffs(20)) # computes with custom number\n0.1353353114073885136885007645878189977740624364169818512599342310325432753817199\n\n# to calculate in double precision convert stehfest coefficients to Float64\njulia> InverseLaplace.gaverstehfest(F, 2.0, v = convert(Vector{Float64}, stehfest_coeffs(18)))\n0.13533650985980258\n\n\n\n\n\ngaverstehfest(func::Function, t::AbstractArray, v = stehfest_coeffs(N))\n\nEvaluate the inverse Laplace transform of func over an array of t using the Gaver-Stehfest algorithm. Computes coefficients once and calculates f(t) across available threads.\n\nExample\n\njulia> gaverstehfest(s -> 1/(s + 1), 2.0:4.0)\n0.1353355048178631463198819259249043857320738467297190227379428405365703748720082\n0.04978728177016550841951683309410878070827215175940039571536203126773133604403101\n0.01831383641619355549133471411401755204406266755309342902744499924574072011058623\n\n\n\n\n\n","category":"function"},{"location":"#Setting-parameters","page":"Home","title":"Setting parameters","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The inverse Laplace tranform routines should not be treated as black boxes. They are prone to instability and can give inaccurate or wrong results. There are some parameters you can set to try to minimize these problems.","category":"page"},{"location":"","page":"Home","title":"Home","text":"InverseLaplace.setNterms\nInverseLaplace.optimize\nInverseLaplace.opteval\nInverseLaplace.setparameters","category":"page"},{"location":"#InverseLaplace.setNterms","page":"Home","title":"InverseLaplace.setNterms","text":"setNterms(ailt::AbstractILt, Nterms::Integer)\n\nset the number of terms used in the inverse Laplace tranform ailt. If ailt stores internal data, it will be recomputed, so that subsequent calls ailt(t) reflect the new value of Nterms.\n\n\n\n\n\n","category":"function"},{"location":"#InverseLaplace.setparameters","page":"Home","title":"InverseLaplace.setparameters","text":"setparameters(w::AbstractWeeks, sigma, b, Nterms)\n\nSet the parameters for the inverse Laplace transform object w and recompute the internal data. Subsequent calls w(t) will use these parameters. If Nterms or both Nterms and b are omitted, then their current values are retained.\n\n\n\n\n\n","category":"function"},{"location":"#Analzying-accuracy","page":"Home","title":"Analzying accuracy","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ILtPair\nabserr\niltpair_power\nTransformPair","category":"page"},{"location":"#InverseLaplace.ILtPair","page":"Home","title":"InverseLaplace.ILtPair","text":"ILtPair(ilt::AbstractILt, ft::Function)\n\nreturn an object of type ILtPair that associates ilt the inverse Laplace transform of a function with it \"exact\" numerical inverse ft. Calling abserr(p, t) returns the absolute error between the inverse transform and the exact value.\n\nExample\n\nThis example compares the inversion using the Weeks algorithm of the Laplace transform of cos(t) to its exact value at t=1.0.\n\njulia> p = ILtPair(Weeks(s -> s/(1+s^2)), cos);\njulia> abserr(p, 1.0)\n\n0.0\n\n\n\n\n\n","category":"type"},{"location":"#InverseLaplace.abserr","page":"Home","title":"InverseLaplace.abserr","text":"abserr(p::ILtPair, t)\n\nCompute the absolute error between the estimated inverse Laplace transform and \"exact\" numerical solution contained in p at the point t. See ILtPair.\n\n\n\n\n\n","category":"function"},{"location":"#InverseLaplace.iltpair_power","page":"Home","title":"InverseLaplace.iltpair_power","text":"iltpair_power(n)\n\nReturn a TransformPair for the power function x^n. This can be used to construct an ILTPair.\n\njulia> p  = Talbot(iltpair_power(3));\n\njulia> Float64(abserr(p, 1)) # test Talbot method for Laplace transform of x^3, evaluated at 1\n2.0820366247539812e-26\n\n\n\n\n\n","category":"function"},{"location":"#InverseLaplace.TransformPair","page":"Home","title":"InverseLaplace.TransformPair","text":"TransformPair{T,V}\n\nA pair of functions for analyzing an inverse Laplace transform method. Field ft is the real-space function. Field fs is the Laplace-space function.\n\n\n\n\n\n","category":"type"},{"location":"#Lower-level-interface","page":"Home","title":"Lower-level interface","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Some of the lower-level routines can be called directly, without constructing types defined in InverseLaplace.","category":"page"},{"location":"","page":"Home","title":"Home","text":"ilt\ntalbot\ngwr\nInverseLaplace.talbotarr","category":"page"},{"location":"#InverseLaplace.ilt","page":"Home","title":"InverseLaplace.ilt","text":"ilt(func::Function, t::AbstractFloat, M::Integer=32)\n\nilt is an alias for the default inverse Laplace transform method talbot.\n\n\n\n\n\n","category":"function"},{"location":"#InverseLaplace.talbot","page":"Home","title":"InverseLaplace.talbot","text":"talbot(func::Function, t::AbstractFloat, M::Integer=talbot_default_num_terms)\n\nEvaluate the inverse Laplace transform of func at the point t. Use M terms in the algorithm. For typeof(t) is Float64, the default for M is 32. For BigFloat the default is 64.\n\nIf BigFloat precision is larger than default, try increasing M.\n\nExample\n\njulia> InverseLaplace.talbot(s -> 1 / s^3, 3)\n4.50000000000153\n\nnote: Note\nThis function uses the fixed Talbot method. It evaluates func for complex arguments.\n\n\n\n\n\n","category":"function"},{"location":"#InverseLaplace.gwr","page":"Home","title":"InverseLaplace.gwr","text":"gwr(func::Function, t::AbstractFloat, M::Integer=gwr_default_num_terms)\n\nEvaluate the inverse Laplace transform of func at the point t. Use M terms in the algorithm. For typeof(t) is Float64, the default for M is 16. For BigFloat the default is 64.\n\nIf BigFloat precision is larger than default, try increasing M.\n\nExample\n\njulia> InverseLaplace.gwr( s -> 1/s^3, 3.0)\n4.499985907607361\n\nnote: Note\nThis function uses the Gaver-Wynn rho method. It evaluates func only for real arguments.\n\n\n\n\n\n","category":"function"},{"location":"#InverseLaplace.talbotarr","page":"Home","title":"InverseLaplace.talbotarr","text":"talbotarr(func, ta::AbstractArray, M)\n\nCompute the inverse Laplace transform for each element in ta. Each evaluation of func(s) is used for all elements of ta. This may be faster than a broadcast application of talbot (i.e. talbot.(...) , but is in general, less accurate.  talbotarr uses the \"fixed\" Talbot method.\n\n\n\n\n\n","category":"function"},{"location":"#References","page":"Home","title":"References","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"J.A.C Weideman, Algorithms for Parameter Selection in the Weeks Method for Inverting the Laplace Transform, SIAM Journal on Scientific Computing, Vol. 21, pp. 111-128 (1999)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Abate, J. and Valkó, P.P., Multi-precision Laplace transform inversion International Journal for Numerical Methods in Engineering, Vol. 60 (Iss. 5-7) pp 979–993 (2004)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Valkó, P.P. and Abate, J., Comparison of Sequence Accelerators for the Gaver Method of Numerical Laplace Transform Inversion, Computers and Mathematics with Application,  Vol. 48 (Iss.3-40) pp. 629-636 (2004)","category":"page"}]
}
