FROM denoland/deno:alpine-1.18.2
ENV NO_COLOR=true
ARG SHEET_ID
ENV SHEET_ID=${SHEET_ID}

EXPOSE 8080


# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
ADD . .

RUN echo "building..."

# Deploy Date
RUN echo "  save deploy date"
RUN BUILD_DATE = $(date --iso-8601=minutes)
#RUN echo "$(BUILD_DATE)" > /app/cache/version
ENV BUILD_DATE=$BUILD_DATE

# Cache DB
RUN echo "  cache db"
RUN deno run -A cache.ts

RUN echo "build complete"


WORKDIR /app
CMD ["deno", "run", "--allow-net", "--allow-env", "--import-map=import_map.json", "--config", "tsconfig.json","server.ts"]